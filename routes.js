const express = require('express')
var list = [];

module.exports = (app) => {
  app.use(express.json())
  app.get('/Numbers', getlistNumbers)
  app.patch('/Numbers/:operation', alterListNumber)
  app.post('/Numbers', addNumbers)
  app.get('/getNumbersMeanValue', getNumbersMeanValues)
  app.delete('/Numbers', deleteNumbers)
}
// eslint-disable-next-line no-unused-vars
let listOfNumbers = [];
const getlistNumbers = (req, res) => {
  res.send(listOfNumbers);
}

const alterListNumber = (req, res) => {
  listOfNumbers = listOfNumbers
    .concat(req.body)
    .filter((i) => !isNaN(i));
  res.send(listOfNumbers);
}

const addNumbers = (req, res) => {    
  if (req.body.length === undefined) {
    return res.status(500).end();
  }

  let listNan = filter(req.body);
  
  if (listNan.length > 0) {
    return res.status(501).send({err: 'Non-numeric values :' +  listNan.join(', ')});
  }

  listOfNumbers = listOfNumbers.concat(req.body);
  return res.send(listOfNumbers);
}

const getNumbersMeanValues = (req, res) => {    
  if (listOfNumbers.length == 0) {
  return res.status(501).send({ err: 'we cannot calculate the mean of an empty list' }).end();
 }
  const average = listOfNumbers.reduce((a, b) => a + b, 0) / listOfNumbers.length;
  res.status(200).send({res: average});
}

const deleteNumbers = (req, res) => {  
  let body = req.query.body.split(',');
  listNan = filter(body);
  if (listNan.length > 0) {
    return res.status(501).send({err: 'Non-numeric values :' +  listNan.join(', ')});
  }

  listOfNumbers = listOfNumbers.filter((i) => body.indexOf(i) == -1);

  res.status(200).send(listOfNumbers); 
}


function filter(list) {
  return  list.filter(element => isNaN(element)); 
  
}