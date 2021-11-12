const express=require('express');
const router = express.Router();
const pool = require('../Config/db');
const path= require('path');

//GET ALL POSTS
router.get('/:user_id/:post_id', async (req,res) => {
  const allPosts= await pool.query(
    "SELECT post_image FROM posts where user_id=$1 and post_id=$2",
  [parseInt(req.params.user_id),parseInt(req.params.post_id)]
  );

  return res.sendFile(allPosts.rows[0]['post_image']);
});

module.exports = router;