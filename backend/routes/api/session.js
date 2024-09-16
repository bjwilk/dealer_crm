// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateLogin = [
    check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
    check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
    handleValidationErrors
];

const router = express.Router();


// Restore session user
router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );



// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    // Check if user exists based on username or email
    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    // If the user doesn't exist
    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: ' username is incorrect.' };
      return next(err);
    }

    // If password is incorrect
    const isPasswordValid = bcrypt.compareSync(password, user.hashedPassword.toString());
    if (!isPasswordValid) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { password: 'Password is incorrect.' };
      return next(err);
    }

    // If both username/email and password are correct
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    // Set the token cookie
    await setTokenCookie(res, user);

    // Return the user data in response
    return res.json({
      user: safeUser
    });
  }
);


  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );
  
  

  module.exports = router;
