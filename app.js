const express = require('express');
const cors=require('cors');
const userRoute=require("./routes/UserRoute")
const connectDB = require('./config/db');
const bodyparser=require("body-parser");
const DealerRoute=require('./routes/DealerRoute')
const updatedDealersdata=require("./Controllers/UpdateDealers")
const hallRoute=require('./routes/HallRoute');
const cloudinary=require('cloudinary');
require('./Controllers/cloudinary')
require('dotenv').config();
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

// Connect Database
connectDB();
//app.use(cors);

app.use(express.json());
 app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.get('/', (req, res) => res.send('Hello world!'));
app.use("/api/users",userRoute);
 app.use("/api/hall",hallRoute);
app.use("/api/getdealer",DealerRoute.getDealerdata);
app.use("/api/postdealer",DealerRoute.postDealerdata)
app.use("/api/updatedDealers/:id",updatedDealersdata.updatedealers);
app.use("/api/del-dealers",updatedDealersdata.delDealers)

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server running on port ${port}`));

