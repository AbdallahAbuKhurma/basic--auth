'use strict';

const bcrypt = require('bcrypt');
const Users = require('../models/users.schema');
const router = require('express').Router();
const basic = require('../auth/basic');



const signUp = async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new Users(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send(e);
  }
};

const signIn = (req, res) => {
  res.status(201).json(req.user);
};


router.post('/signup', signUp);
router.post('/signin', basic, signIn);

module.exports = router;

module.exports = router;