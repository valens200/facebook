const mongoose = require('mongoose');
require('dotenv').config()
const url = process.env.URL;
const connection = async() => {
  try{
    const connection = await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser:true
    });
    console.log('connected to mongodb');

  }catch(err){
      console.log(err);
  }

}

module.exports = connection;
