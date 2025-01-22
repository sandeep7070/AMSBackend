import multer from "multer";

import path from 'path'

// configer multer storage 
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/temp');                           // specify the folder for upload
    },
    filename: (req, file, cd) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cd(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);

    }
});

export const upload = multer({ storage });
