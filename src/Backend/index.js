const express=require('express');
const connectDB=require('./Configs/db');
const cors = require('cors');
const { PORT, MONGODB_URI, NODE_ENV,ORIGIN } = require("./config");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./errors");
const productController=require('./Controllers/Products.controller');
const authRoutes=require('./Routes/Auth.route');
require('dotenv').config();

const app=express();
app.use(
    cors({
      credentials: true,
      origin: ORIGIN,
      optionsSuccessStatus: 200,
    })
);

if (NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.status(200).json({
      type: "success",
      message: "server is up and running",
      data: null,
    });
});;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth", authRoutes);

app.use("*", (req, res, next) => {
    const error = {
      status: 404,
      message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
});

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || SERVER_ERR;
    const data = err.data || null;
    res.status(status).json({
      type: "error",
      message,
      data,
    });
});

app.use('/products',productController);


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port,async()=>{
    try {
        await connectDB();
    } catch (error) {
        console.log(error)
    }
    console.log(`listening on port ${port}`);
    console.log('Connected to database');
});