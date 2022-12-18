const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');
const dataController = require('./controllers/dataController')
const recentController = require('./controllers/recentController')
const authController = require('./controllers/authController')

const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET || 'SoftUni';
const connectionString = 'mongodb://127.0.0.1:27017/pcbuildz';
const path = require('path');




start();

async function start() {
    mongoose.set('strictQuery', true)
    await mongoose.connect(connectionString);
    console.log('Database connected');

    const app = express();
    app.use(cookieParser(cookieSecret));
    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        res.json({ message: 'REST service operational' });
    });

    // app.use('/users');
    app.use('/items/catalog/', dataController);
    app.use('/recent/catalog', recentController);
    
    app.use('/auth', authController)

    app.listen(3000, () => console.log('REST service started on port 3000!'));
}