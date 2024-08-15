const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/postgres');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Connect to the database
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
        // Sync the database and start the server, force true to drop and recreate tables
        return sequelize.sync();
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        app.listen(3000, () => {
            console.log('Server is running on port 3000, but database connection failed');
        });
    });

// Use user routes
app.use('/api', userRoutes);