const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const { rejects } = require('assert');

const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
saltRounds = 10;

let name_array = []

function convert(name) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(name, saltRounds, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        console.log("for " + name);
        console.log(hash);
        name_array.push(hash);
        resolve();
      }
    });
  });
}

async function compare(name) {
  let results = false;

  for (const element of name_array) {
    const result = await new Promise((resolve, reject) => {
      bcrypt.compare(name, element, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result === true) {
      results = true;
    }
  }

  return results;
}

app.get('/', (req, res) => {
  let num = Math.floor(Math.random() * 1000)
  let n = name_array[Math.floor(Math.random() * name_array.length)]
  res.render('index.ejs',{data: num, _name: n});
  
});

app.get('/subname',(req,res)=>{
  res.render('namesubmit.ejs',{arr: name_array});
});

app.get('/checkName',(req,res)=>{
  res.render('namesubmit1.ejs');
});

app.post('/check', async (req,res)=>{
  res.send(await compare(req.body.name))
});

app.post('/addName', async (req,res)=>{
  await convert(req.body.name);
  res.redirect('/subname');
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
  convert('Saad')
  // console.log(compare('Saad'))
});


