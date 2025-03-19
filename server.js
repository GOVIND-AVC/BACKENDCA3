const bodyParser = require('body-parser')
const express=require('express')
const app=express()
app.use(bodyParser.json())
const port=4000


let users=[
    {email:"alice123@example.com",password:"alice123"},
    {email:"alice124@example.com",password:"alice124"},
    {email:"alice125@example.com",password:"alice125"},
    {email:"alice126@example.com",password:"alice126"}
]


app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const user=users.find(f=>f.email===req.body.email && f.password===req.body.password)
    if(!user){
        return res.status(400).json({message:"Invalid credintials"})
    }
    res.status(200).json({message:"Login successfull"})
})


app.put('/user',(req,res)=>{
    const {email,password}=req.body

    const userIndex=users.findIndex(f=>f.email===email)
    if(userIndex===-1){
        return res.status(404).json({message:"Email not found"})
    }
    users[userIndex].password=password
    res.json({message:"Updated successfully"})
})


app.delete('/user',(req,res)=>{
    const{email}=req.body
    const user=users.find(f=>f.email===req.body.email)
    if(!user){
        return res.status(404).json({message:"Email not found"})
    }
    users=users.filter(f=>f.email!==req.body.email)
    return res.json({message:"User deleted successfully"})
})


app.listen(port,()=>{
    console.log(`server listening on ${port}`)
})

