const { createWorker } = require("tesseract.js");

module.exports = (receiptImageUrl) => {
  const innerFunction = (async () => {
    try {
      console.log("di tesseractjs di folder OCR");
      const worker = createWorker();

      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");

      const {
        data: { text },
      } = await worker.recognize(receiptImageUrl);

      await worker.terminate();

      console.log('Tesseract process done')

      return text;

    } catch (error) {
      console.error(error)
    }
  })();

  return innerFunction;
};
