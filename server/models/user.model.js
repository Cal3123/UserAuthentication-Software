const mongoose = require("mongoose")
const User = new mongoose.Schema(
    {
        //setting properties of your mongoose schema
        //setting them as a requirement dependoing in property
        name:{type: String, required: true},
        email:{type: String, required: true, unique: true},
        password:{type: String, required: true},
        quote:{type: String},
    },
    //names the collection of your model in you mongoDB databse as 'user-data'
    {collection: "user-data"}
)

//creates the model named "UserData" and passes in the schema/ associates it with the schema
const model = mongoose.model("UserData", User)
//this model allows us to directly access and interact with mongoose
module.exports = model