const tesseract = require("../OCR");

class OCRController {
  static postOcr(req, res) {
    console.log(req.file.size, 'SIZE')

    if (req.file.size > 350000) {
      console.log('image is too large');
      res.status(400).json({ message: "image is too large" });
    } else {
      const imageUrl = req.file.buffer;

      console.log(imageUrl, 'IMAGEURL')
  
      // console.log("masuk controller", imageUrl);
      // const imageUrl = req.urlImage
      // const { imageUrl } = req.body
      // console.log(req.body)
      // console.log("gambar di ocrController, BUFFER", imageUrl);
  
      if (!imageUrl) return res.status(400).json({ message: "bad request" });
  
      tesseract(imageUrl)
        .then((dataObj) => {
          // console.log("masuk tesseract", dataObj);
          if (dataObj) {
            console.log('SUCCESS!')
            res.status(200).json({ ...dataObj });
          } else {
            res.status(200).json({});
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "fail" });
        });
      // if (totalPrice) {
      // } else {
  
      // }  
    }
  }
}
module.exports = OCRController;
