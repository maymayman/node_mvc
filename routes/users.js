const express = require('express');
const router = express.Router();

const UserModel = require('../models/Users');
const cookie = require('cookie');

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

router.get('/login', async function(req, res, next) {
  try {
    return res.render('users/login', { url: WEB_URL });
  } catch (err) {
    next(err)
  }
});

router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;

    console.log({ username, password })

    const user = await UserModel.findOne({username});

    if (password != user.password) throw 'Invalid username/password';

    res.setHeader('Set-Cookie', cookie.serialize('session-token', jwt, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

    res.redirect('/admin/users')
  } catch (err) {
    next(err)
  }
});

module.exports = router;
