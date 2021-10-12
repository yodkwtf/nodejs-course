const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassowrd,
} = require('../controllers/userController');

//# GET ALL USERS
router.route('/').get(getAllUsers);

// # SHOW CURRENT USER
router.route('/showMe').get(showCurrentUser);

// # UPDATE USER
router.route('/updateUser').post(updateUser);

// # UPDATE USER PASSWORD
router.route('/updateUserPassword').post(updateUserPassowrd);

// # GET SINGLE USER
router.route('/:id').get(getSingleUser);

module.exports = router;
