const express=require('express');
const router = express.Router();
const pool = require('../Config/db');
const path= require('path');
const fs= require('fs');

router.post('/:user_id', async(req,res) => {
    if(req.files === null){
      console.log(req.files.file);
      return res.status(400).json({msg: 'No file uploaded'});
    }
    console.log(req.files);
    const file= req.files.File;
    
    const createPost= await pool.query(
      "INSERT INTO POSTS (user_id,POST_IMAGE,CAPTION) VALUES ($1,$2,$3)",
      [req.params.user_id, path.join(__dirname,"./../uploads/",file.name), req.body.Caption]
    );
    file.mv(path.join(__dirname,'./../uploads/',file.name), err => {
      if(err){
        console.log(err);
        return res.status(500).send(err);
      }
      console.log(path.join(__dirname,"./../uploads/",file.name));
      return res.status(201).send({ name : file.name, path : path.join(__dirname,'./../uploads/',file.name) });
    });

    //return res.status(201).json('Post Created');

  
  

});

module.exports=router;