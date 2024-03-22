import express from 'express';
import { registerUser, currentUser, loginUser } from '../controllers/userController.js';
import validateToken from '../middleware/validateTokenHandler.js';

const router = express.Router();

// Route to handle new user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get the current user's profile, protected by token validation
router.get('/current', validateToken, currentUser);

export default router;
