const multer = require("multer");

const ctrl = {
  upload: async (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/");
      },
      filename: (req, file, callback) => {
        var mimeType;

        switch (file.mimetype) {
          case "image/jpeg":
            mimeType = "jpg";
            break;
          case "image/png":
            mimeType = "png";
            break;
          case "image/gif":
            mimeType = "gif";
            break;
          case "image/bmp":
            mimeType = "bmp";
            break;
          default:
            mimeType = "jpg";
            break;
        }
        callback(null, `${Date.now()}.${mimeType}`);
      },
    });

    const limits = {
      files: 50,
      fileSize: 1024 * 1024 * 1024, //1G
      fieldSize: 25 * 1024 * 1024,
    };

    const upload = multer({ storage, limits }).any();

    upload(req, res, next, (err) => {
      if (err) {
        return console.log(err);
      }
      next();
    });
  },
};

module.exports = ctrl;
