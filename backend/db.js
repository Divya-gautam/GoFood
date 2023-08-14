const mongoose = require('mongoose');
const mongoURL="mongodb+srv://gofood:muskan123@cluster0.2j4jn4p.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURL);
      console.log('Connected!');
      let fetched_data = mongoose.connection.db.collection("food_items");
      let data = await fetched_data.find({}).toArray()
      let  fetcheddd_data =  mongoose.connection.db.collection("foodCategory");
      let catdata = await fetcheddd_data.find({}).toArray()
    
      // console.log(data);
      global.food_items = data;
      global.foodCategory = catdata;
      console.log(global.food_items)
    } catch (error) {
      console.log('err: ', error);
    }
  };
  module.exports=mongoDB;
