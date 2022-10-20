const express = require("express");
const cors=require('cors')
const app = express();
require("./dbConnection");
const dotenv = require("dotenv");
const PORT=process.env.PORT || 5000
const errorHandler = require("./middlewares/errorHandler");
const studentRoutes =require('./Routes/studentRoutes')

dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/students',studentRoutes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
