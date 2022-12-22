import express from 'express';

import {
    allUsers,
    findUserById,
    deleteUser,
    createUser,
    updateUser,
} from '../controller/users';

const router = express.Router();

router.get('/', allUsers);
router.get('/:userId', findUserById);
router.delete('/:userId', deleteUser);
router.post('/', createUser);
router.post('/:userId', updateUser);



export default router;
