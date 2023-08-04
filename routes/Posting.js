const express = require('express')
const router = express.Router()
//const mongoose=require("mongoose")
// const bodyParser = require("body-parser");
const cloudniaryModule=require('cloudinary')

const cloudinary=cloudniaryModule.v2

cloudinary.config({
    cloud_name:"dtnud4out",
    api_key:'664851891649345',
    api_secret:'F8CJ60_jFwwWF4uP40PB9QlTbfA'
})
const data=require('../model/schema')

router.use(express.urlencoded());
// mongoose.connect('mongodb+srv://kushal:Kushal24@cluster0.q2aawhd.mongodb.net/test',()=>{
//     console.log("Its connected")
// })

// Parse JSON bodies (as sent by API clients)

// router.use(bodyParser.urlencoded({ extended: true }))
// router.use(bodyParser.json())

router.use(express.json({limit: '25mb'}));
router.use(express.urlencoded({limit: '25mb'}));


router.get("/alldata",async (req,res)=>{
    const b=await data.find().sort({_id:-1})
    res.status(200).json(b)
})
router.post("/upload", async (req,res)=>{
    // console.log(req.file.filename)
    
   const {name,location,description,PostImage}=req.body
   if(PostImage){
    const uploadres=await cloudinary.uploader.upload(PostImage,{
        upload_preset:'instaclone'
   })
   const random=Math.floor(Math.random()*100000)
    const a=await data.create({
        name,
        location,
        likes:random,
        description,
        PostImage:uploadres.url,
        date:"30-07-2023"
    })
    console.log(a)
    // res.send(a)
    res.status(200).json({
        message:"sucess"
    })
    
}
})


module.exports = router;   