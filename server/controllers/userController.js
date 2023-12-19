const db = require("../models");
var bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

const {products: Products, user: User, role: Role, refreshToken: RefreshToken, cart: Cart, orders: Orders, statuses: Statuses} = db;

  exports.userCart = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" });
        }
        const cart = await user.getCarts('product_id', 'count', 'price')
        res.status(200).send(cart);
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.addCart = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" });
        }
        if (req.body.productId && req.body.count) {
            Cart.findOne({
              where: {
                product_id: req.body.productId,
                userid: req.userId
              }
            })
            .then(async (product) => {
              if (!product) {
                user.createCart({product_id: req.body.productId, count: req.body.count, price: req.body.price}).then(() => {
                  res.send({ message: "Товар добавлен в корзину" });
                });
              } else {
                product.count = product.count + Number(req.body.count);

                product.save()
                  .then(res.send({ message: "Количество товара изменено" }))
              }
            })
        } else {
            res.status(404).send({ message: "При добавлении товара в корзину произошла ошибка" });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.deleteCart = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" });
        }
        if (req.body.productId) {
          Cart.findOne({
            where: {
              product_id: req.body.productId,
              userid: req.userId
            }
          }).then(async (product) => {
              if (!product) {
                return res.status(404).send({ message: "Товар не найден" });
              } else {
                await product.destroy();
                res.send({ message: "Товар удален из корзины" });
              }
          })
        } else {
            res.status(404).send({ message: "При удалении товара из корзины произошла ошибка" });
        }
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.userOrders = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" });
        }
        const orders = await user.getOrders({where: {canceled: false}, order: [['date', 'DESC']]})

        for (i = 0; i < orders.length; i++) {
          const status = await Statuses.findOne({ where: { id: orders[i].statusid } })
          orders[i].statusid = status.status
        }

        res.status(200).send(orders);
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.userOrder = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" });
        }

        const order = await Orders.findOne({ where: { id: req.params.id } })
        if (order.canceled == true) {
          return res.status(404).send({ message: "Заказ не найден" });
        }
        const status = await Statuses.findOne({ where: { id: order.statusid } })
        order.statusid = status.status
        res.status(200).send(order);
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.addOrder = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" });
        } else {
          if (req.body.total) {
            const cart = await user.getCarts('product_id', 'count')
            const products = cart.map(item => (item.product_id))
            const counts = cart.map(item => (item.count))
            const fio = user.firstname + user.surname + user.patronymic;
            const currentDate = new Date();
            user.createOrder({statusid: 1, product_array: products, count_array: counts, total: req.body.total, date: currentDate, fio: fio, canceled: false, reasonOfCancel: ''}).then(() => {
              Cart.destroy({
                where: {
                  userid: req.userId
                }
              }).then(async () => {
                    res.send({ message: "Заказ создан" });
                  })
            });
          } else {
            res.status(404).send({ message: "При создании заказа произошла ошибка" });
          }
          
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.deleteOrder = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" });
        }
        if (req.body.orderId) {
          Orders.findOne({
            where: {
              id: req.body.orderId,
              userid: req.userId
            }
          }).then(async (order) => {
              if (!order) {
                return res.status(404).send({ message: "Заказ не найден" });
              } else {
                order.canceled = true;
                order.reasonOfCancel = req.body.reason;
                order.statusid = 2;
                await order.save();
                res.send({ message: "Заказ отменен" });
              }
          })
        } else {
            res.status(404).send({ message: "При отмене заказа произошла ошибка" });
        }
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.userBoard = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" });
        }
          res.status(200).send({
            id: user.id,
            firstname: user.firstname,
            surname: user.surname,
            patronymic: user.patronymic,
            email: user.email,
            login: user.login
          });
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.adminBoard = (req, res) => {
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" });
        }
          res.status(200).send({
            id: user.id,
            firstname: user.firstname,
            surname: user.surname,
            patronymic: user.patronymic,
            email: user.email,
            login: user.login
          });
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.allOrders = (req, res) => {
    Orders.findAll({order: [['statusid', 'DESC']]})
      .then(async (orders) => {
        if (!orders) {
          return res.status(404).send({ message: "Произошла ошибка" });
        }

        for (i = 0; i < orders.length; i++) {
          const status = await Statuses.findOne({ where: { id: orders[i].statusid } })
          orders[i].statusid = status.status
        }
        res.status(200).send({orders})
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.updateStatus = (req, res) => {
    Orders.findOne({
      where: {
        id: req.body.id
      }
    })
      .then(async (order) => {
        if (!order) {
          return res.status(404).send({ message: "Заказ не найден" });
        }
        if (req.body.status == 2) {
          order.canceled = true;
          order.reasonOfCancel = req.body.reason;
          order.statusid = req.body.status;
          await order.save();
          res.send({ message: "Заказ отменен" });
        } else {
          order.canceled = false;
          order.statusid = req.body.status;
          await order.save();
          res.send({ message: "Статус заказа изменен" });
        }
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.createProduct = (req, res) => {
    Products.create({
      product_id: Number(req.body.id),
      name: req.body.name,
      thumbnail: req.body.thumbnail,
      land: req.body.land,
      date: Date.now(),
      price: Number(req.body.price),
      in_stock: req.body.in_stock,
      typeId: Number(req.body.typeid)
    })
      .then(product => {
        res.send({ message: "Товар создан" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.deleteProduct = (req, res) => {
    Products.destroy({
      where: {
        product_id: req.body.id
      }
    })
      .then(product => {
        res.send({ message: "Товар удален" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.allProducts = (req, res) => {
    Products.findAll()
      .then(async (products) => {
        if (!products) {
          return res.status(404).send({ message: "Произошла ошибка" });
        }
        res.status(200).send({products})
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
