// write a vasic server.js exprees server
// 1. create a server
// 2. create a route
// 3. listen to the port

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);