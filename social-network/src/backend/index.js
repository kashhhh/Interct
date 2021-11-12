const express= require('express');
const app=express();
const pool = require('./Config/db');
const path= require('path');
const fs= require('fs');
const cors= require('cors');
const fileUpload= require('express-fileupload');

/*fs.rename(path.join(__dirname,'/postImages','/dummy.png'),path.join(__dirname,'/postImages','/p1u1.png'), (err) => {
  console.log(err)
})*/

app.use(cors({
  origin: '*'
}));
app.use((req,res,next) => {
  res.setHeader("Content-Type",'application/json');
  next();
});
app.use(fileUpload());
app.use("/users", require('./routes/users.js'));
app.use("/posts", require('./routes/posts'));
app.use("/comments", require('./routes/comments'));
app.use("/displays", require('./routes/displays'));
app.use("/posts/images", require('./routes/postImage'));
app.use("/likes",require('./routes/likes'));
app.use("/upload",require('./routes/upload'));


const PORT= process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(PORT);
})



