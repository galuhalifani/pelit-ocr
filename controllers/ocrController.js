const tesseract = require("../OCR");

class OCRController {
  static postOcr(req, res) {
    console.log(req.file.size, 'SIZE')

    if (req.file.size > 270000) {
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
  
      const promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 120000, 'TIMEOUT');
      });

      Promise.race([tesseract(imageUrl), promise2])
      .then((dataObj) => {
        console.log("masuk tesseract", dataObj);
        // console.log(dataObj)
        if (dataObj !== 'TIMEOUT') {
          console.log('SUCCESS!')
          // console.log(dataObj, 'dataobj SUCCESS CONTROLLER')
          res.status(200).json({ ...dataObj });
        } else if (dataObj == 'TIMEOUT') {
          console.log('TIMEOUT!')
          res.status(200).json('TIMEOUT');
        } else {
          console.log('ERROR!')
          // console.log(dataObj)
          res.status(200).json({});
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "fail" });
      });

      // tesseract(imageUrl)
      //   .then((dataObj) => {
      //     console.log("masuk tesseract");
      //     if (dataObj) {
      //       console.log('SUCCESS!')
      //       res.status(200).json({ ...dataObj });
      //     } else {
      //       res.status(200).json({});
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.status(500).json({ message: "fail" });
      //   });
      // if (totalPrice) {
      // } else {
  
      // }  
    }
  }
}
module.exports = OCRController;
