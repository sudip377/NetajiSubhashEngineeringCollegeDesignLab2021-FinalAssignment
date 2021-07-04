const { Console } = require('console');
const express = require('express');
var bodyParser=require('body-parser');
var mybodyParser=bodyParser.json();
var jwt = require('jsonwebtoken');
//var jsonParser = bodyParser.json()
const bcrypt=require('bcrypt');
const cors=require('cors');
var app= express();
const mongoose=require('mongoose');
const Db='mongodb+srv://sudip1998:Sudip123@@cluster0.r9pxt.mongodb.net/Student?retryWrites=true&w=majority';
const userSchema=new mongoose.Schema({
    email:{
        type:"string",
        require:true

    },
    mobile:{
        type:Number,
        require:true

    },
    password:{
        type:"string",
        require:true
    },
    img:
    {
        data: Buffer,
        contentType: String
    }


})
const User=mongoose.model('regs',userSchema);
mongoose.connect(Db,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {console.log('mongoDB connected...')}
).catch((err)=>console.log('not connected'));

app.use(bodyParser.json());
app.use(cors());
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/signup' , mybodyParser,function(req,res,next){
    //const {email,mobile,password}=req.body;
    const {email,mobile,password}=req.body;
    if(!email || !mobile|| ! password){
        return res.status(422).json({error:"please fill the field currect"});
    }
   else{ 
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if (err){
            return res.status(500).json({
                error:err
            })
        }
        else{
    User.findOne({email:email}).then((userExist)=>{
        if(userExist){
            return res.status(421).json({error:"Email already Exist"});
        }
        const user= new User({email:email,mobile:mobile,password:hash});
    user.save().then(()=>{
        res.status(201).json({message:"user register successfully"});
    }).catch((err)=>res.status(500).json({error:"failed to sign up"}));
    //console.log(req.body);
    //res.json({message:req.body});
    //res.send("hello sudip nayek from router.js")
}).catch(err=>{console.log(err);});
   //console.log(req.body);
    //res.json({message:email});
   // console.log("hello fro sign up sudip"+ email);
    
}
});
   }

});
app.post('/login',(req,res)=>{
    var email=req.body.email
    var password=req.body.password
    //var mobile=req.body.mobile
    User.findOne({email:email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){

                if(err){
                    return   res.status(402).json({ message:"wrong password" })
                }
                if(result){
                    let token=jwt.sign({email:user.email,mobile:user.mobile,passwor:user.password},'value')
                    return res.status(500).json({email:user.email,mobile:user.mobile,passwor:password})
                }
                else{
                    return   res.status(423).json({ message:"wrong password" })   
                }
            })
         }else{
            return   res.status(424).json({ message:"user not exist" })
         }
        
    })
        
});
app.post("/update", (req, res) => {
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;

    //console.log(name);
  
      db.regs.update(
        {email:email},{
            $Set:{ mobile:mobile,password:password}
        })
        .then(err => {
            if(err)
                return res.status(425).json({err:err});
            else
            return res.status(500).json({email:email,mobile:mobile,password:password});
            
        });
      
    });

    

app.listen(3001,function(){
    
    console.log("server port 3001");
}) ;