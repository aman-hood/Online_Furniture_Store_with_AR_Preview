import express from 'express';
import {register, verify, reVerify, login, logout, forgotPassword, verifyOTP, changePassword, allUser, getUserById} from '../controllers/userController.js'
import { isAdmin, isAuthenticated } from '../middlewares/isAuthenticated.js';
const router = express.Router()

<<<<<<< HEAD
// router.get('/verify', verify);
console.log("User routes loaded!");

=======
>>>>>>> 4fa3c16479dda62fa76b465898d6fe9199e53196
router.post('/register', register)
router.post('/verify', verify)
router.post('/reVerify', reVerify)
router.post('/login', login)
router.post('/logout', isAuthenticated, logout)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp/:email', verifyOTP)
router.post('/change-password/:email', changePassword)
router.get('/all-users', isAuthenticated, isAdmin, allUser)
router.get('/get-user/:userId', getUserById)

export default router