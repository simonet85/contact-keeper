const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

/*
 * @route  POST  api/users
 * @desc Register a user
 * @access Public
 */

router.post(
  '/',
  //Validation rules for fields
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please add a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructuring the request body
    const { name, email, password } = req.body;

    try {
      //Find the user that owns the mail
      let user = await User.findOne({ email });
      //If found display the status 400
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      //Else Create a new user
      user = new User({
        name,
        email,
        password,
      });
      //salt constant
      const salt = await bcrypt.genSalt(10);
      //Encrypt the user password with bcryot and salt
      user.password = await bcrypt.hash(password, salt);
      //Saving the new user
      await user.save();

      //Payload : data to be send
      const payload = {
        user: {
          id: user.id,
        },
      };
      //Use the jwt
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
