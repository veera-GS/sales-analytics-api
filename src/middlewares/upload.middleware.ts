import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (_, file, cb) => {
    cb(null, `sales_data_${Date.now()}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({ storage });
