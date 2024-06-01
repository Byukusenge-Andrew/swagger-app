// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const _ = require('lodash');
// const User = require('../models/User');
// const { registerValidation } = require('../validation');

// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: User management
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       required:
//  *         - name
//  *         - email
//  *         - password
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The auto-generated id of the user
//  *         name:
//  *           type: string
//  *           description: User name
//  *         email:
//  *           type: string
//  *           description: User email
//  *         password:
//  *           type: string
//  *           description: User password
//  *       example:
//  *         
//  *         name: John Doe
//  *         email: john.doe@example.com
//  *         password: secret
//  */

// /**
//  * @swagger
//  * /api/users/register:
//  *   post:
//  *     summary: Registers a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/User'
//  *     responses:
//  *       200:
//  *         description: The user was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/User'
//  *       400:
//  *         description: Some error occurred
//  */
// router.post('/register', async (req, res) => {
//   // Validate the data before creating a user
//   const { error } = registerValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   // Check if the user is already in the database
//   const emailExist = await User.findOne({ email: req.body.email });
//   if (emailExist) return res.status(400).send('Email already exists');

//   // Hash the password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);

//   // Use Lodash to pick only the necessary fields from the request body
//   const userData = _.pick(req.body, ['name', 'email', 'password']);

//   // Create a new user
//   const user = new User({
//     ...userData,
//     password: hashedPassword,
//   });

//   try {
//     const savedUser = await user.save();
//     res.send(savedUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// module.exports = router;
