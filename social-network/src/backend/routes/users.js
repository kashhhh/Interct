const express=require('express');
const router = express.Router();
const pool = require('../Config/db');

//GET ALL USERS
router.get('/', async (req,res) => {
  const allUsers= await pool.query(
    "SELECT users.*,count(posts.post_id) as post_count FROM posts RIGHT JOIN users ON users.USER_ID=posts.USER_ID GROUP BY users.USER_ID ORDER BY users.USER_ID ;"
  );
  return res.send(JSON.stringify(allUsers.rows, null, 4));
});

router.get('/check/:email_id', async (req,res) => {
  const checkUser= await pool.query(
    "SELECT EXISTS (SELECT 1 FROM USERS WHERE email=$1);",
    [req.params.email_id]
  );
  console.log(checkUser.rows[0].exists);
  return res.send(checkUser.rows[0].exists);
});



router.post('/',async (req,res) => {
  const username= req.body.Name;
  const email= req.body.Email;
  const password = req.body.Password;

  console.log(username,email,password);
  
  const createUser = await pool.query(
    "insert into users (username,email,pwd) values ($1,$2,$3)",
    [ username,email,password ],
  );

  res.status(201).json('Account Created');
})




//GETS EMAILS OF ALL USERS
// router.get('/emails', async (req,res) => {
//   const abc= await pool.query(
//     "select email from users"
//   );
//   res.header("Content-Type",'application/json');
//   res.send(JSON.stringify(abc.rows, null, 4));
// });


//GET USER BASED ON ID
router.get('/:id', async (req,res) => {
  const userOnId= await pool.query(
    `select * from users where user_id=${parseInt(req.params.id)}`
  );
  return res.send(JSON.stringify(userOnId.rows, null, 4));
});



console.log("API")

module.exports=router;