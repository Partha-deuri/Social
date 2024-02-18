const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");


dotenv.config(); 
const PORT = process.env.PORT || 5000;

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan('common'));


// routes 
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
 
const startApp = async () => {
    try {
        mongoose
            .connect(process.env.MONGODB_URL)
            .then(() => console.log("connected to database"))
            .catch(e => console.log(e));

        app.listen(PORT, () => {
            console.log(`server connected at Port: ${PORT} `);
        });
    }
    catch (err) {
        console.log(err);
    }
}

startApp();

app.get('/',(req,res)=>{
    res.status(200).json("i am alive");
})
