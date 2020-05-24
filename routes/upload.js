const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../config/database');
const fs = require('fs');
const formidable = require('formidable');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/avatars/',
  filename: function(req, file, cb) {
    cb(null, req.query.file_id + '_' + file.originalname);
  }
});
const upload = multer({
  storage: storage
}).single('avatar');

router.post('/', function(req, res) {
  upload(req, res, (err) => {
    if(err){res.send(err)} else {res.send('Upload complete')}
  });
});
router.get('/', function(req, res) {
  let path = __dirname.replace('routes', 'public\\avatars\\' + req.query.filename);
  fs.readFile(`./public/avatars/${req.query.filename}`, 'base64', function(err, file) {
    if(err) {
      res.send(err)
    } else {
      const imgUrl = `data:image/jpeg;base64, ${file}`;
      res.send(imgUrl);
      //res.send(`<img src='${imgUrl}' className='avatar1'/>`);
      // res.setHeader('Content-Type', 'image/jpg');
      // res.setHeader('Content-Disposition', `attachment; filename=${req.query.filename}`);
      // res.write(file, 'binary');
      // res.end();
    }
  });
});
module.exports = router;
