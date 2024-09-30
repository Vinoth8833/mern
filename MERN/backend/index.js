const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userModel = require('./model/UserModel')
const port = 3000
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/user")
.then((res)=>console.log("DB is connected"))
.catch(err=>console.log(err))

app.post('/create',async(req,res)=>{   
    console.log(req.body)
    try {
       
        const user = await new userModel(req.body);
        await user.save()
        res.send("created success fully")

    } catch (error) {
        
    }
})


app.get("/",async(req,res)=>{
   try {
     const response = await userModel.find()
     res.send(response).status(200)
   } catch (error) {
    
   }
})
app.put('/update/:id',async(req,res)=>{
  const {name} = req.body
  const {id} = req.params
  try {
      const update = await user.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).send("data update sucess")
  } catch (error) {
      
  }
})


app.listen(port, ()=>{
   console.log(`server is running in ${port}` )
})