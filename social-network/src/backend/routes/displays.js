const express=require('express');
const router = express.Router();
const pool = require('../Config/db');
const path= require('path');


//GET ALL POSTS
router.get('/:user_id', async (req,res) => {
  const allPosts= await pool.query(
    "select display from users where user_id=$1",
    [parseInt(req.params.user_id)]
  );

  return res.sendFile(allPosts.rows[0]['display']);
});

router.put('/:user_id', async (req,res) => {
  console.log(path.join(__dirname,'./../uploads/',req.files.Display.name));
  displayFile=req.files.Display;
  
  const updateDisplay = await pool.query(
    "UPDATE users SET DISPLAY=$1 WHERE USER_ID = $2;",
    [ 
      path.join(__dirname,'./../uploads/',displayFile.name),  req.params.user_id
    ]
  );
  console.log(path.join(__dirname,'./../uploads/',displayFile.name));
  
  displayFile.mv(path.join(__dirname,'./../uploads/',displayFile.name), err => {
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
  });

  return res.status(201).json("PUT Successful");
});

module.exports= router;