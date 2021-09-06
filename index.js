const express = require('express');
require('dotenv').config();


console.log(process.env);

// Express server app
const app = express();

// Public folder
app.use(express.static('public'));

// Serialize and unserialize body request
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// TODO: CRUD: Events

// Listen request
app.listen(process.env.PORT, () => {
    console.log(`Server running in http://localhost:${4000}`);
})
