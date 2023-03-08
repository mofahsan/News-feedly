
const express = require("express");
const app = express();
const routes = require("./routes/routes")
require('./cronjob/fetchNews')

require("dotenv").config()
require("./db")

const PORT = process.env.PORT || 4000   ;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next()
})

app.use('/api',routes)

app.use('/',(req,res)=>{
    res.status(200).send({message:'welcome to news feedly'})
})


 app.listen(PORT, () =>
  console.log(`Server listening on PORT ${PORT}`)
);