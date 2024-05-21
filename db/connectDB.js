const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        let connectionInstance = await mongoose.connect("mongodb+srv://ritesh7767:Ritesh7767@cluster0.gl85cov.mongodb.net/miniProject3")
        console.log('Database connection Successful !! Host name :- ', connectionInstance.connection.host)
    }
    catch(err){
        if(err) throw err
    }
} 

module.exports = connectDB