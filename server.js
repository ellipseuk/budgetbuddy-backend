const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/postgres');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.send('Server is running'));
app.use('/api', userRoutes);

// Database Connection
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await sequelize.sync();
        app.listen(3000, () => console.log('Server is running on port 3000'));
    } catch (error) {
        console.error('Database connection failed:', error);
        app.listen(3000, () => console.log('Server is running on port 3000, but database connection failed'));
    }
};

startServer();