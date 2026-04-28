const express = require('express');
const UserController = require('../../controllers/user-controller');
const router = express.Router();
const {authReqValidator} = require('../../middlewares/index')
router.post('/signup', authReqValidator.validateUser, UserController.create);
router.post('/signin', authReqValidator.validateUser, UserController.signin);
module.exports = router;