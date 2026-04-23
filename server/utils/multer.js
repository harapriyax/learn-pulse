import multer from "multer";

const upload = multer({
    dest: "uploads/",
    limits: {
        fileSize: 500 * 1024 * 1024, // 500MB max for videos
    },
    fileFilter: (req, file, cb) => {
        // Accept any image or video file
        if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
            cb(null, true);
        } else {
            cb(new Error(`File type ${file.mimetype} is not allowed. Only images and videos are accepted.`), false);
        }
    }
});
export default upload;