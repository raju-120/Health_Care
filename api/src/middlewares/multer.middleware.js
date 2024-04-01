import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../assets");
      console.log(req);
    },

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    },
    
  });
  //console.log(destination);

/* const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "../../../uploads");
        //console.log(cb);
    },
    filename: function(req, file, cb){
        const suffix = Date.now();
        cb(null, file.originalname + '-' + suffix);
    },
});
//console.log(storage);
 */
export const upload = multer({ 
    storage
});