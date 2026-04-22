const express= require('express');
const {PORT} = require('./config/server-config')
const app = express();

const startServer = () => {

        app.listen(PORT, (req,res) => {
        console.log(`Server started listening on ${PORT}`);
    });
}

startServer();