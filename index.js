const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")
const app = express()

require("dotenv").config()


app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({status:"success",message:"Welcome to the backend"})
})

app.use("/api/auth",userRoutes)
app.use("/api/admin",adminRoutes)


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(process.env.PORT,()=>{
            console.log("Connected to MongoDB");
            console.log("Server is Listening");
        })
    } catch (error) {
        console.log(error);
    }
}

connectDB()