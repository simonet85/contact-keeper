const express = require('express');

const router = express.Router();

/*
 * @route  GET  api/contacts
 * @desc Get all users contacts
 * @access Private
 */

router.get('/', (req, res) => {
  res.send('Get All Users Contacts ');
});

/*
 * @route  POST  api/contacts
 * @desc Add new contact
 * @access Private
 */

router.post('/', (req, res) => {
  res.send('Add new contact ');
});

/*
 * @route  PUT  api/contacts/:id
 * @desc Update users contacts
 * @access Private
 */

router.put('/:id', (req, res) => {
  res.send('Update users contacts ');
});

/*
 * @route  DELETE  api/contacts/:id
 * @desc Delete users contacts
 * @access Private
 */

router.delete('/:id', (req, res) => {
  res.send('Delete users contacts ');
});

module.exports = router;
