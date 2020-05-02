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
      data: {fio: req.query.fullname, log: req.query.setlogin , pass: req.query.setpass},
    };
    Players.create(put_data).then(user=>res.send(user))
    .catch(err=>console.log('EROR CREATE USER-->', err));
  } else {
    Players.findAll({
      where: {
        'data.log': { [Op.eq]: req.query.log },
        'data.pass': { [Op.eq]: req.query.pass}
      }
    })
    .then(players=>{
      res.send(players.length > 0 ? players[0] : players)
    })
    .catch(err=>console.error('ERROR LOGIN-->', err));
  }
});

//Запись данных в БД таблицу (id не надо)
router.get('/add', (req, res)=>{
  const put_data = {
    data: {fio: req.query.fullname, log: req.query.setlogin , pass: req.query.setpass},
  };
  let {data} = put_data;
  Players.create({data}).then(user=>res.send(user))
  .catch(err=>console.log(err));
});

router.get('/getuser', (req, res)=>{
  res.send('Works!')
});
module.exports = router;
