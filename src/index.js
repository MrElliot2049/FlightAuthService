const express= require('express');
const {PORT} = require('./config/server-config')
const app = express();
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const startServer = () => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended:true }));
        app.use('/api',apiRoutes);
        
        app.listen(PORT, async (req,res) => {
        console.log(`Server started listening on ${PORT}`);
    });
}

startServer();