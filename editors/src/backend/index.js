const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');
const multer=require('multer')
const nodemailer=require('nodemailer')
const { use } = require('react');
const path = require('path');
const { console } = require('inspector');
const app=express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());

const upload = multer({ 
  limits: { fileSize: 50 * 1024 * 1024 }, 
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  })
});
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'editpro',
    password:'charutanu'
});
db.connect((err)=>{
    if(err){
        console.err(err)

    }else{
        console.log("database connected")
    }
})
app.listen(3000,()=>{
    console.log("port is running on 3000")
});
app.post('/admin/login',(req,res)=>{
    let {username,password}=req.body;
    if (username==="tanuj"){
        if(password==='123'){
            res.status(200).json({success:true});
        }
        else{
            res.status(200).json({success:false,message:'incorrect password'});
        }

    }
    else{
        res.status(200).json({success:false,message:'Wrong details'});
    }
})
app.post('/user/signup',(req,res)=>{
    let {username,email,password} =req.body
    db.query(`SELECT EXISTS(SELECT * FROM userlogin WHERE EMAIL='${email}') AS exist`,(err,result)=>{
        if(err){
            return res.status(200).json({success:false ,message:'error while fetching data'})
        }
            const userexist=result[0].exist===1;
            if (userexist){
            return res.status(200).json({success:false, message:'user already exists'})
        }
        db.query(`INSERT INTO userlogin(username,email,password) VALUES(?,?,?)`,[username,email,password],(err2,result)=>{
            if(err2){
                console.error(err2)
                return res.status(200).json({success:false,message:"error while inserting data into database"})
                
            }
            else{
                return res.status(200).json({success:true})
            }
        });
        });

    })
app.post('/user/login',(req,res)=>{
    let {email,password}=req.body;
    db.query(`SELECT userid,password FROM userlogin WHERE email=?`,[email],(err,result)=>{
        if(err){
            res.status(200).json({success:false, message:"error while fetching"});
        }
        else{
            if(result.length===0){
                return res.status(200).json({success:false ,message:"user doesnt exists"});
            }
            else if (result[0].password===password){
                return res.status(200).json({success:true,userid:result[0].userid});

            }
            else{
                res.status(200).json({success:false ,message:"incorrect password"});
            }
        }
    });
})
    app.post('/addneweditor',upload.single('image'),(req,res)=>{
        let{name,email,phone,dob,type,extra}=req.body;
        const image = req.file?req.file.filename:null;
        db.query(`SELECT EXISTS(SELECT * FROM editors WHERE email=?) as exist`,[email],(err,result)=>{
            if(err){
                console.error(err)
                return res.status(500).json({success:false ,message:"error while fetching data"})
            }
            let userexist=result[0].exist===1
            if(userexist){
                return res.status(409).json({success:false ,message:"editor already exists"})
            }
            else{
                db.query(`INSERT INTO editors(name,email,phone,dob,image,type,extra) VALUES(?,?,?,?,?,?,?)`,[name,email,phone,dob,image,type,extra],(err,result)=>{
                    if(err){
                        console.error(err)
                        return res.status(500).json({success:false,message:'error while inserting'})
                    }
                    else{
                        return res.status(201).json({success:true,message:'inserted succesfully'})
                    }
                })
            }
        })
    })
app.get('/alleditors', (req, res) => {
    db.query(`SELECT * FROM editors`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(200).json({ success: false, message: 'Error fetching editors' });
      } else {
        res.status(200).json({ success: true, editors: result });
      }
    });
  });
  app.get('/fetch/:userid',(req,res)=>{
    const {userid}=req.params;
    db.query(`SELECT username,email from userlogin where userid=?`,[userid],(err,result)=>{
        if (err){
            res.status(500).json({success:false})
        }
        else{
            res.status(200).json({success:true,name:result[0].username,email:result[0].email})
        }
    })
  })
  app.get('/photoeditors', (req, res) => {
    db.query(`SELECT * FROM editors where type='photo'`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(200).json({ success: false, message: 'Error fetching editors' });
      } else {
        res.status(200).json({ success: true, editors: result });
      }
    });
  });
    app.get('/videoeditors', (req, res) => {
    db.query(`SELECT * FROM editors where type='video'`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(200).json({ success: false, message: 'Error fetching editors' });
      } else {
        res.status(200).json({ success: true, editors: result });
      }
    });
  });
      app.get('/shortseditors', (req, res) => {
    db.query(`SELECT * FROM editors where type='shorts'`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(200).json({ success: false, message: 'Error fetching editors' });
      } else {
        res.status(200).json({ success: true, editors: result });
      }
    });
  });
      app.get('/thumbnaileditors', (req, res) => {
    db.query(`SELECT * FROM editors where type='thumbnail'`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(200).json({ success: false, message: 'Error fetching editors' });
      } else {
        res.status(200).json({ success: true, editors: result });
      }
    });
  });
  app.post('/profileupdate',(req,res)=>{
    console.log(req.body)
    const prname=req.body.username
    const userid=req.body.userid
    db.query(`UPDATE userlogin SET username=? WHERE userid=?`,[prname,userid],(err,result)=>{
      if(err){
        console.err(err)
        res.status(200).json({success:false})
      }
      else{
        res.status(200).json({success:true})
      }
    })
  })
  app.get('/editor/:id',(req,res)=>{
    const id=req.params.id
    db.query(`SELECT * FROM editors WHERE id=?`,[id],(err,result)=>{
      if(err){
        console.error(err)
        res.status(500).json({success:false,message:'database error'})
      }
      else{
        res.status(200).json({success:true,result:result})
      }
    })
  })
  app.post('/reqcontact', (req, res) => {
  const { editorid, userid, message } = req.body;
  db.query(`SELECT email FROM editors WHERE id = ?`, [editorid], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, error: "Editor not found" });
    }

    const editoremail = result[0].email;

    const acceptLink = `http://localhost:3000/response?status=accepted&userid=${userid}&editorid=${editorid}`;
    const rejectLink = `http://localhost:3000/response?status=rejected&userid=${userid}&editorid=${editorid}`;

    const htmlBody = `
      <h3>Contact Request from User ID: ${userid}</h3>
      <p>Message: ${message}</p>
      <p>
        <a href="${acceptLink}">✅ Accept</a> |
        <a href="${rejectLink}">❌ Reject</a>
      </p>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vtanujreddy@gmail.com',
        pass: 'qhujvtbdwrhwcncz', 
      },
    });
    try{
    transporter.sendMail({
      from: 'vtanujreddy@gmail.com',
      to: editoremail,
      subject: 'User has requested you for editing',
      html: htmlBody,
    }, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return res.status(500).json({ success: false, error: "Failed to send email" });
      }
      db.query(`INSERT INTO requests(userid,editorid) VALUES(?,?) `,[userid,editorid],(err,result)=>{
        if (err){
          console.error(err)
          return res.status(500).json({ success: false, error: "Failed to send email" });

        }
      })
      res.status(200).json({ success: true, message: "Email sent" });
    });}
    catch(err){
      console.error(err);
      return res.status(500).json({ success: false, error: "Failed to send email" });
    }
  });
  
});
app.get('/response', (req, res) => {
  const { status, userid, editorid } = req.query;

  db.query(
    'UPDATE requests SET status = ? WHERE userid = ? AND editorid = ?',
    [status, userid, editorid],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.send("Something went wrong.");
      }

      res.send(`<h2>You have ${status}ed the request from user ID ${userid}.</h2>`);
    }
  );
});
