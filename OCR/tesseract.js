const { createWorker } = require("tesseract.js");

module.exports = (receiptImageUrl) => {
  // let startTime = new Date()

  return new Promise(async function(resolve, reject) {
    try {
        console.log("entering function tesseract");
      const worker = createWorker();

      await worker.load();

        console.log('Load process done')

      await worker.loadLanguage("eng");

        console.log('Lang process done')

      await worker.initialize("eng");

        console.log('Init process done')

      setTimeout(() => {
        worker.terminate()
        console.log('worker terminated')
        reject(new Error('Request timed out'));
      }, 75000);

      const {
        data: { text },
      } = await worker.recognize(receiptImageUrl);

        console.log('Recognize process done')

      await worker.terminate();

        console.log('Tesseract process done', text)

      resolve(text);

    } catch (error) {
        console.error(error)
    }
  })
}