const controller = require("../controllers/productsController");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/products/:by", controller.productsList);

    app.get("/api/product/:productId", controller.oneProduct);

    app.get("/api/types", controller.allTypes);
    
  };