const express = require('express');
const router = express.Router();

const UserModel = require('../models/Users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await UserModel.find();
    return res.render('users', { users, title: 'USERS PAGE' });
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

/* POST users create. */
router.post('/', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    const UserClass = new UserModel({ username, password });
    const user = await UserClass.save();

    return res.json({ code: 200, errorMess: '', data: { user }});
  } catch (err) {
    return res.json({ code: 400, errorMess: err, data: null });
  }
});

module.exports = router;
