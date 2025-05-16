const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');
const authMiddleware = require('../middleware/authMiddleware');

// router.post("/auth/signup", authController.signup)


// auth request
router.post("/user/todos", authMiddleware, todosController.createTodos);

module.exports = router;