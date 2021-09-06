/**
 * Auth Routes
 * host + /api/auth
 */
const { Router } = require('express');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');

router.post('/new', createUser);

// Login
router.post('/', loginUser);

// Renew token
router.get('/renew', renewToken);

module.exports = router;