const express = require('express');
const morgan = require('morgan');

require('dotenv').config();
require('colors');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// To recognize the incoming Request Object as a JSON Object.
app.use(express.json());

// To recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is connected in ${process.env.NODE_ENV} mode on port ${PORT}`.blue);
});
