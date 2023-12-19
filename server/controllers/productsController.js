const db = require("../models");
const { types: Types, products: Products} = db;

exports.productsList = (req, res) => {
    if (['name', 'date', 'price'].includes(req.params.by) == false) {
        query ={
            order: ['product_id'],
            include: [{
                model: Types,
                attributes: ['type'],
                required: true,
                where: {
                    type: req.params.by
                }
            }],
            where: {
              in_stock: true
            }
        }
    } else {
        query ={
            order: [req.params.by],
            include: [{
                model: Types,
                attributes: ['type'],
                required: true, 
            }],
            where: {
              in_stock: true
            }
        }
    }

    Products.findAll(query)
      .then(async (products) => {
        if (!products) {
          return res.status(404).send({ message: "Products not found" });
        }
        const formatedProducts = products.map((item) => {
            let newItem = {
            product_id: item.product_id,
            name: item.name,
            thumbnail: item.thumbnail,
            in_stock: item.in_stock,
            type: item.type.type,
            price: item.price,
            date: item.date,
            land: item.land}
            return newItem
        });
        res.status(200).send(formatedProducts)
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.oneProduct = (req, res) => {
    Products.findOne({
        include: [{
            model: Types,
            attributes: ['type'],
            required: true
        }],
        where: {
          product_id: req.params.productId
        }
      })
        .then(async (product) => {
          if (!product) {
            return res.status(404).send({ message: "Product not found" });
          }
          let formatedProduct = {
            product_id: product.product_id,
            name: product.name,
            thumbnail: product.thumbnail,
            in_stock: product.in_stock,
            type: product.type.type,
            price: product.price,
            date: product.date,
            land: product.land}
          res.status(200).send(formatedProduct)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.allTypes = (req, res) => {
    Types.findAll({
      })
        .then(async (types) => {
          if (!types) {
            return res.status(404).send({ message: "Types not found" });
          }
          
          res.status(200).send(types.map(item => item.type))
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};


  