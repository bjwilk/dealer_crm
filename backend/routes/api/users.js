// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];
  

  router.get('/', async(req,res) => {
    const users = await User.findAll();
    return res.json(users)
  } )

// Check if email exists
router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  return res.json({ exists: !!user });
});

// Check if username exists
router.post('/check-username', async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ where: { username } });
  return res.json({ exists: !!user });
});

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

  

module.exports = router;