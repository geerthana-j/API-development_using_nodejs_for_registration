const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const { Sequelize } = require('sequelize');
const User = require('./models/User');
const response_body = require('./response_body.js');
const util = require('./util.js');
const Data = require('./models/Data.js');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const sequelize = new Sequelize('practice', 'odoo', '123456', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',

});

// Check the connection
sequelize
    .authenticate()
    .then(async () => {
        const allTables = await sequelize.getQueryInterface().showAllTables();
        console.log(allTables);
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
sequelize.sync();

app.post('/api/register', async function (req, res) {
    try{
    console.log(req.body);
    const { username, email, password, full_name, age, gender } = req.body;
    if (!username || !email || !password || !full_name) {
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_REQUEST',
            message: response_body.res_error_code.INVALID_REQUEST
        });
    }
    const registeredUser = await User.findOne({ where: { username: username } });
    console.log(registeredUser);
    if (registeredUser != null) {
        return res.status(409).json({
            status: 'error',
            code: 'USERNAME_EXISTS',
            message: response_body.res_error_code.USERNAME_EXISTS
        });
    }
    const registeredEmail = await User.findOne({ where: { email: email } });
    if (registeredEmail != null) {
        return res.status(409).json({
            status: 'error',
            code: 'EMAIL_EXISTS',
            message: response_body.res_error_code.EMAIL_EXISTS
        });
    }

    if (!util.isValidPassword(password)) {
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_PASSWORD',
            message: response_body.res_error_code.INVALID_PASSWORD
        });
    }

    if (gender == undefined ||(gender.toLowerCase() != 'male' && gender.toLowerCase() != 'female' && gender.toLowerCase() != 'non-binary')) {
        return res.status(400).json({
            status: 'error',
            code: 'GENDER_REQUIRED',
            message: response_body.res_error_code.GENDER_REQUIRED
        });
    }
    if (!Number.isInteger(age) || age < 0) {
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_AGE',
            message: response_body.res_error_code.INVALID_AGE
        });
    }
    const user_data = await User.create(req.body); 
    const res_req_body = response_body.res_reg_sucess;
    res_req_body.data = req.body;
    res.status(200).send(res_req_body);
    // res.send("run");
}
catch (err) {
    return  res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: response_body.res_error_code.INTERNAL_ERROR

    });
}
});
app.post('/api/token', async function (req, res) {
    try {
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(400).json({
            status: 'error',
            code: 'MISSING_FIELDS',
            message: response_body.res_error_code.MISSING_FIELDS
        });
    }
    const registeredUser = await User.findOne({ where: { username: username } });
    if(registeredUser == null || registeredUser.dataValues.password != password){
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_CREDENTIALS',
            message: response_body.res_error_code.INVALID_CREDENTIALS
        });
    }
    const accessToken = util.generateAccessToken(req.body);
    const res_access_token = response_body.res_get_tokens;
    res_access_token.data.access_token = accessToken;
    res.status(200).send(res_access_token)
}
catch (err) {
    return  res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: response_body.res_error_code.INTERNAL_ERROR

    });
}
    

});


app.post('/api/data', async function (req, res) {
    try {
    console.log(req.headers);
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if( util.verifyToken(authHeader)== false ){
        return res.status(403).json({
            status: 'error',
            code: 'INVALID_TOKEN',
            message: response_body.res_error_code.INVALID_TOKEN
        });
    }
    const {key,value} = req.body;
    if(key == undefined){
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_KEY',
            message: response_body.res_error_code.INVALID_KEY
        });
    }
    if (value == undefined){
        return res.status(400).json({
            status: 'error',
            code: 'INVALID_VALUE',
            message: response_body.res_error_code.INVALID_VALUE
        });
    }
    const registered_key = await Data.findOne({ where: { key: key } });
    if (registered_key != null) {
        return res.status(409).json({
            status: 'error',
            code: 'KEY_EXISTS',
            message: response_body.res_error_code.KEY_EXISTS
        });
    }
    await Data.create(req.body);
    return res.status(200).send(response_body.res_store_data);
}
catch (err) {
    return  res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: response_body.res_error_code.INTERNAL_ERROR

    });
}
});
app.get('/api/data/:key', async function (req, res) {
    try {
    const authHeader = req.headers['authorization'];
    if( util.verifyToken(authHeader)== false ){
        return res.status(403).json({
            status: 'error',
            code: 'INVALID_TOKEN',
            message: response_body.res_error_code.INVALID_TOKEN
        });
    }
    // console.log("hello");
    const key = req.params.key;
    console.log(key);
    const registered_key = await Data.findOne({ where: { key: key } });
    if(registered_key == null) {
        return res.status(404).json({
            status: 'error',
            code: 'KEY_NOT_FOUND',
            message: response_body.res_error_code.KEY_NOT_FOUND
        });
    }
    console.log(registered_key.dataValues.key);
    var res_get_data = response_body.res_retrieve_data;
    res_get_data.data.key = registered_key.dataValues.key;
    res_get_data.data.value = registered_key.dataValues.value;
    return res.status(200).send(res_get_data);
}
catch (err) {
    return  res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: response_body.res_error_code.INTERNAL_ERROR

    });
}

});
app.put('/api/data/:key', async function (req, res) {
    try {
    const authHeader = req.headers['authorization'];
    if( util.verifyToken(authHeader)== false ){
        return res.status(403).json({
            status: 'error',
            code: 'INVALID_TOKEN',
            message: response_body.res_error_code.INVALID_TOKEN
        });
    }
    const key = req.params.key;
    const value = req.body.value;
    console.log(key);
    console.log(value);
    const registered_key = await Data.findOne({ where: { key: key } });
    if(registered_key == null) {
        return res.status(404).json({
            status: 'error',
            code: 'KEY_NOT_FOUND',
            message: response_body.res_error_code.KEY_NOT_FOUND
        });
    }
    // await Data.update({ where: {value: value}});
    await Data.update(
        { value },
        { where: { key } }
      );
    return res.status(200).send(response_body.res_update_data);
    }
    catch (err) {
        return  res.status(500).json({
            status: 'error',
            code: 'INTERNAL_ERROR',
            message: response_body.res_error_code.INTERNAL_ERROR
    
        });
    }

});
app.delete('/api/data/:key', async function (req, res) {
    try {
    const authHeader = req.headers['authorization'];
    if( util.verifyToken(authHeader)== false ){
        return res.status(403).json({
            status: 'error',
            code: 'INVALID_TOKEN',
            message: response_body.res_error_code.INVALID_TOKEN
        });
    }

    const key = req.params.key;
    console.log(key);
    const registered_key = await Data.findOne({ where: { key: key } });
    if(registered_key == null) {
        return res.status(404).json({
            status: 'error',
            code: 'KEY_NOT_FOUND',
            message: response_body.res_error_code.KEY_NOT_FOUND
        });
    }
    await Data.destroy({
        where: { key },
    });
    return res.status(200).send(response_body.res_delete_data);
}
catch (err) {
    return  res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: response_body.res_error_code.INTERNAL_ERROR

    });
}

});


app.listen(8883, function () {
    console.log('server started');
});
// CREATE DATABASE Contact
// 5432
// http://localhost:8884/identify