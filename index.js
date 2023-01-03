const express = require('express');
const app = express();



require('./startup/route')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();



app.get('/',(req,res)=>{
  res.send('Welcome to genres API')
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));