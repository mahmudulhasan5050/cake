import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import {
  allCakes,
  createCake,
  deleteCake,
  findCakeById,
  updateCake,
} from '../controller/cakes';

const router = express.Router();

router.get('/', allCakes);
router.get('/:cakeId', findCakeById);
router.delete('/:cakeId', deleteCake);
router.post('/',authMiddleware, createCake);
router.post('/:cakeId', updateCake);



export default router;
