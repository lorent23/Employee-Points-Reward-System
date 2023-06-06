import express from 'express';
import { pointsController } from '../controllers';
import { hasPermission, verifyToken } from '../middleware/auth';

const router = express.Router();

router.post(
    '/', 
    [
        verifyToken,
        hasPermission(['points_create'])
    ],
    pointsController.create
    )

router.get(
    '/',
    [
        verifyToken,
        hasPermission(['points_list'])
    ],
    pointsController.readAll
)

router.get(
    '/users',
    [
        verifyToken,    
        hasPermission(['points_list'])
    ],
    pointsController.getAll     
    )

router.get(
    '/user',
    [
        verifyToken,    
        hasPermission(['points_view'])
    ],
    pointsController.getAllById     
    )    

router.put(
    '/:pointsId', 
    [
        verifyToken,
        hasPermission(['points_update'])
    ],
    pointsController.updatePoints
    )

router.delete(
    '/:pointsId',
    [
        verifyToken,
        hasPermission(['points_delete'])
    ],
    pointsController.deletePoints
)
export default router;