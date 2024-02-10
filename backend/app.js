const express = require("express");
const app = express();
const bodyParser=require("body-parser")
const fileUpload=require("express-fileupload")

const cookieParser=require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const dotenv=require("dotenv")

dotenv.config({ path: "backend/config/config.env" });




const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const cors = require('cors')


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment)
app.use(errorMiddleware);

module.exports = app;
