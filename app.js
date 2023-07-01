const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let num = Math.floor(Math.random() * 1000)
  let name_array = ['Saad','Fahad','Shorower','Sakib','Tanvir']
  let n = name_array[Math.floor(Math.random() * name_array.length)]
  
  res.render('index.ejs',{data: num, _name: n});
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});


