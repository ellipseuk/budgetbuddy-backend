const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');

const app = express();
app.use(bodyParser.json());

// Empty route to test if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Attempt to connect to the database
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    // Database sync and server start
    sequelize.sync().then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
    app.listen(3000, () => {
        console.log('Server is running on port 3000, but database connection failed');
    });
});
    