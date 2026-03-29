import multer from "multer"

const storage = multer.memoryStorage();

export const singleUploadData = multer({storage}).single("file");

export const UploadData = multer({ storage }).fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 }
]);
 