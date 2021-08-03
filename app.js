const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./routes/index.js");
// const { autoAchievement } = require("./controllers/controllerAchievement");

// var cron = require("node-cron");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Pelit OCR')
})

app.use("/", router);

// autoAchievement();

// cron.schedule("0 */6 * * *", () => {
//   autoAchievement();
// });

// cron.schedule('* * * * * *', () => {
//   sendPushNotification("ExponentPushToken[lWVeNgF_A_VAyBqN2Tum6o]")
// })

app.listen(PORT, () => {
  console.log(`Pelit app listening at http://localhost:${PORT}`);
});
