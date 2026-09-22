import multer from "multer"
import ApiError from "../utils/ApiError.js";
import cloudinary from 'cloudinary';

//config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//handle upload
export async function handleUpload(file) {
    const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(fileBase64, {
        resource_type: "image"
    });

  return result;
}



//Storage configuration
const storage = multer.memoryStorage();

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