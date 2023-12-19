module.exports = (sequelize, Sequelize) => { 
    const Products = sequelize.define("products", {
        product_id: {
            type: Sequelize.BIGINT,
            primaryKey: true
          },
        name: {
            type: Sequelize.TEXT
        },
        thumbnail: {
            type: Sequelize.TEXT
        },
        land: {
            type: Sequelize.TEXT
        },
        date: {
            type: Sequelize.DATE
        },
        price: {
            type: Sequelize.INTEGER
        },
        in_stock: {
            type: Sequelize.BOOLEAN
        }
    });
  
    return Products;
  };