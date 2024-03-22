import express from 'express';
const router = express.Router();
import { getContacts, createContact, getContact, updateContact, deleteContact } from '../controllers/contactController.js';
import validateToken from '../middleware/validateTokenHandler.js';

// Apply the token validation middleware to all routes
router.use(validateToken);

// Routes for handling the collection of contacts
router.route('/')
  .get(getContacts) // Get all contacts
  .post(createContact); // Create a new contact

// Routes for handling individual contacts
router.route('/:id')
  .get(getContact) // Get a single contact by ID
  .put(updateContact) // Update a contact by ID
  .delete(deleteContact); // Delete a contact by ID

export default router;
