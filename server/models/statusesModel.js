module.exports = (sequelize, Sequelize) => { 
    const Statuses = sequelize.define("statuses", {
        status: {
            type: Sequelize.TEXT
        }
    });
  
    return Statuses;
  };