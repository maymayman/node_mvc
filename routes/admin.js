const express = require('express');
const router = express.Router();

const UserModel = require('../models/Users');

/* GET users listing. */
router.get('/users', async function(req, res, next) {
  try {
    
    return res.render('admin/users', { });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

module.exports = router;