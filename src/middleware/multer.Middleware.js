import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, ".public/temp"); //   specify the destination directory
    },
    filename: function (req, file, cb) {
        
        cb(null, file.originalname) // specify the file name
    }
})


export const upload = multer ({
    storage,
})
