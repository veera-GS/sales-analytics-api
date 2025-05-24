import express from 'express';
import { refreshData } from '../controllers/refresh.controller';
import { upload } from '../middlewares/upload.middleware';
import { uploadAndProcess } from '../controllers/upload.controller';

const router :any= express.Router();

router.post('/upload', upload.single('file'), uploadAndProcess);

router.post('/refresh', refreshData);
export default router;
