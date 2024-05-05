const express = require("express");
const { chats } = require("./data/data");
const ConnectDatabase= require('./config/db.js');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes.js');
const {notFound, errorHandler}=require("./middlewares/errorMiddleware.js")
const dotenv= require("dotenv");
const cors= require("cors");
const chatRoutes=require('./routes/chatRoutes.js')


dotenv.config();
const port=process.env.PORT;
const app = express();

app.use(cors());
//app.use(notFound)
//app.use(errorHandler)

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.get("/api/get-chat",(req,res)=>{

    res.send(chats);
})



// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
  });


ConnectDatabase();
app.listen(port,console.log(`port running on ${port}`.yellow.bold ));