module.exports = (sequelize, Sequelize) => { 
    const Orders = sequelize.define("orders", {
        product_array: {
            type: Sequelize.ARRAY(Sequelize.TEXT) 
        },
        count_array: {
            type: Sequelize.ARRAY(Sequelize.TEXT) 
        },
        date: {
            type: Sequelize.DATE
        },
        total: {
            type: Sequelize.INTEGER
        },
        fio: {
            type: Sequelize.TEXT
        },
        canceled: {
            type: Sequelize.BOOLEAN
        },
        reasonOfCancel: {
            type: Sequelize.TEXT
        },
    });
  
    return Orders;
  };