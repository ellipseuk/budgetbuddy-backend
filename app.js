const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/users", (req, res) => {
    res.send({
        message: "Hello World"
    });
});

app.post("/api/messages", (req, res) => {
    const message = req.body.message;
    console.log(`Received message: ${message}`);
    res.send({ status: 'Message received', message: message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});