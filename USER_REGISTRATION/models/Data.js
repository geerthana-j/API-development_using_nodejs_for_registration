const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('practice', 'odoo', '123456', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});

const Data = sequelize.define('Data', {
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
  tableName: 'data',
  freezeTableName: true,
  timestamps: false,


});

module.exports = Data;