const { authJwt } = require("../middleware");
const controller = require("../controllers/userController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/user/orders",
    [authJwt.verifyToken],
    controller.userOrders
  );

  app.get(
    "/api/user/order/:id",
    [authJwt.verifyToken],
    controller.userOrder
  );

  app.post(
    "/api/user/order/submit",
    [authJwt.verifyToken],
    controller.addOrder
  );
  
  app.post(
    "/api/user/order/delete",
    [authJwt.verifyToken],
    controller.deleteOrder
  );
  
  app.get(
    "/api/user/cart",
    [authJwt.verifyToken],
    controller.userCart
  );

  app.post(
    "/api/user/cart/submit",
    [authJwt.verifyToken],
    controller.addCart
  );

  app.post(
    "/api/user/cart/delete",
    [authJwt.verifyToken],
    controller.deleteCart
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/admin/orders",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allOrders
  );

  app.post(
    "/api/admin/order/status",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateStatus
  );

  app.get(
    "/api/admin/products",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allProducts
  );

  app.post(
    "/api/admin/product/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createProduct
  );

  app.post(
    "/api/admin/product/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProduct
  );

  // app.post(
  //   "/api/admin/type/add",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.addType
  // );

  // app.post(
  //   "/api/admin/type/delete",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.deleteType
  // );
};