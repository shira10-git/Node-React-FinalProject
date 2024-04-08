const User=require("../models/User")
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")



const login=async (req,res)=>{
const {userName,password}=req.body
if(!userName||!password){
    return res.status(400).json({message:"Missing a Field/s And All Are Required!"})
}
const foundUser=await User.findOne({userName:userName}).lean()
// console.log("dayata"+foundUser.role);
if(!foundUser||!foundUser.active){
    return res.status(401).json({message:"unauthorized"})
}
console.log(password);

const match=await bcrypt.compare(password,foundUser.password)
console.log(match);
if(!match){
    return res.status(401).json({message:"unauthorized"})
}
console.log(foundUser.userName);
console.log(foundUser.password);
console.log(foundUser.active);
console.log("YES "+foundUser.role);
const userInfo={_id:foundUser._id,name:foundUser.name,userName:foundUser.userName,role:foundUser.role,email:foundUser.email}
const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
res.json({token:accessToken})
}
module.exports={login}
