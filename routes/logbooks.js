const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Logbook = require('../models/Logbook');
const { logbookValidation } = require('../validation');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Logbooks
 *   description: Logbook management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Logbook:
 *       type: object
 *       required:
 *         - date
 *         - activity
 *         - hours
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the logbook entry
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the logbook entry
 *         activity:
 *           type: string
 *           description: Description of the activity
 *         hours:
 *           type: number
 *           description: Number of hours spent
 *       example:
 *         
 *         date: 2023-05-30
 *         activity: Studied for exams
 *         hours: 3
 */

/**
 * @swagger
 * /api/logbooks:
 *   get:
 *     summary: Returns the list of all the logbook entries
 *     tags: [Logbooks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the logbook entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Logbook'
 */
router.get('/', auth, async (req, res) => {
  try {
    const logbooks = await Logbook.find();
    res.json(logbooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/logbooks:
 *   post:
 *     summary: Creates a new logbook entry
 *     tags: [Logbooks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Logbook'
 *     responses:
 *       201:
 *         description: The logbook entry was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Logbook'
 *       400:
 *         description: Some error occurred
 */
router.post('/', auth, async (req, res) => {
  // Validate the data before creating a logbook entry
  const { error } = logbookValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Use Lodash to pick only the necessary fields from the request body
  const logbookData = _.pick(req.body, ['date', 'activity', 'hours']);

  // Create a new logbook entry
  const logbook = new Logbook(logbookData);

  try {
    const savedLogbook = await logbook.save();
    res.status(201).json(savedLogbook);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /api/logbooks/{id}:
 *   put:
 *     summary: Updates an existing logbook entry
 *     tags: [Logbooks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The logbook entry id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Logbook'
 *     responses:
 *       200:
 *         description: The logbook entry was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Logbook'
 *       400:
 *         description: Some error occurred
 *       404:
 *         description: The logbook entry was not found
 */
router.put('/:id', auth, async (req, res) => {
  // Validate the data before updating the logbook entry
  const { error } = logbookValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Use Lodash to pick only the necessary fields from the request body
  const logbookData = _.pick(req.body, ['date', 'activity', 'hours']);

  try {
    const logbook = await Logbook.findByIdAndUpdate(req.params.id, logbookData, { new: true });
    if (!logbook) return res.status(404).send('Logbook entry not found');

    res.json(logbook);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
