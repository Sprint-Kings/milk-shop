module.exports = (sequelize, Sequelize) => { 
    const Types = sequelize.define("types", {
        type_id: {
            type: Sequelize.BIGINT,
            primaryKey: true
          },
        type: {
            type: Sequelize.TEXT
        }
    });
  
    return Types;
  };