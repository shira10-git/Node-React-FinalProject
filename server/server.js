require('dotenv').config()
const express=require("express")
const cors=require('cors')
const path = require('path')
const corsOptions=require('./config/corsOptions')
const connectDB=require('./config/dbConn')
const { mongoose } = require('mongoose')
const PORT=process.env.PORT||3575
const app=express()

connectDB()
console.log(process.env.NODE_ENV)


app.use(express.static("public"))

app.get('/uploads/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});
app.use('/uploads', express.static(__dirname + '/'));



app.use(cors(corsOptions))
app.use(express.json())
app.use("/api/users",require('./routes/userRoute'))
app.use("/api/todos",require('./routes/todoRoute'))
app.use("/api/auth",require("./routes/authRoutes"))




mongoose.connection.once('open',()=>{
console.log("connected to mongodb")
app.listen(PORT,()=>
    console.log(`server running on port ${PORT}`))
})

mongoose.connection.on('error',err=>{
console.log(err)
})