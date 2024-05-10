const express = require('express');
const morgan = require('morgan');

const connectDB = require('./config/db');
const userRoute = require('./route/userRoute');
const categoryRoute = require('./route/categoryRoute');

require('dotenv').config();
require('colors');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// To recognize the incoming Request Object as a JSON Object.
app.use(express.json());

// To recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use('/api/users', userRoute);
app.use('/api/category', categoryRoute);

app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status,
            msg: err.message
        }
    })
});

// For any undefined Api's
app.get('*', (req, res) => {
    res.status(404).send('Endpoint does not exist');
});

app.listen(PORT, () => {
    console.log(`Server is connected in ${process.env.NODE_ENV} mode on port ${PORT}`.red);
});
