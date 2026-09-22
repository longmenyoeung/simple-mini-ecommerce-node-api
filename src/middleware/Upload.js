import path from "path"
import multer from "multer"
import ApiError from "../utils/ApiError.js";

//Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "_" + Math.round(Math.random() * 1E9)
            + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

//file type validation
const fileFilter = (req, file, cb) => {
    const allowedType = [
        "image/jpg",
        "image/png",
        "image/jpeg",
        "image/webp"
    ]

    if (allowedType.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new ApiError(400, "Only JPG, JPEG, PNG and WEBP images are allowed."))
    }
}

// Multer configuration
const upload = multer({
    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

export default upload;