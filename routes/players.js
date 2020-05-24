const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Players = require('../models/Players');
const sequelize = require('sequelize');
const { Op } = require('sequelize')

//Чтение данных из БД таблицы
router.get('/', function(req, res) {
  if(req.query.fullname) {
    const put_data = {
      data: {fio: req.query.fullname, log: req.query.setlogin, pass: req.query.setpass},
    };
    Players.create(put_data).then(user=>res.send(user))
    .catch(err=>console.log('EROR CREATE USER-->', err));
  } else {
    Players.findAll({
      where: {
        data: { log: req.query.log, pass: req.query.pass }
      }
    })
    .then(players=>{
      res.json(players)
    })
    .catch(err=>console.error('ERROR LOGIN-->', err));
  }
});

router.post('/', function(req, res) {
  const put_data = {fio: req.query.fullname, log: req.query.setlogin, pass: req.query.setpass, avatar: req.query.setavatar || null};
  Players.update({data: put_data},{ where: { id: req.query.player_id } })
  .then(function(updatedRows) {
    res.json(updatedRows);
  }).catch(err => console.log(err));
});

router.get('/getuser', (req, res)=>{
  console.log('REQ-Q->', req.query)
  Players.findAll({
    where: {
      id: req.query.id
    }
  })
  .then(players=>{
    res.json(players)
  })
  .catch(err=>console.error('ERROR GET USER-->', err));
});
module.exports = router;
