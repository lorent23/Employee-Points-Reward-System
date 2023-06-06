import express from 'express';
import { userController } from '../controllers';
import { checkDuplicateEmail, hasPermission, verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/', [
    verifyToken, 
    hasPermission(['user_create']), 
    checkDuplicateEmail], 
    userController.create)

router.get(
    '/',
    [
       verifyToken,
       hasPermission(['user_list']),
    ],
    userController.readAll
    );

router.get(
    '/:id',
    [
       verifyToken,
       hasPermission(['user_view']),
    ],
    userController.readById
    );

router.put(
    '/:id',
    [
        verifyToken,
        hasPermission(['user_update'])
    ],
    userController.update
    );

router.delete(
    '/:id',
    [
        verifyToken,
        hasPermission(['user_delete'])
    ],
    userController.delete
);
    

export default router;