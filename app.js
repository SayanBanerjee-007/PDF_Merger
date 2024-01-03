const { Console } = require("console");
const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const upload = multer({ dest: path.join(__dirname, "/upload") });
const { mergePDF } = require("./merger");
const fs = require("fs");

const port = process.env.PORT || 80;

app.use("/static", express.static(path.join(__dirname, "static")));
app.set("view engine", "pug");
app.set("/views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", upload.array("pdfs", 2), async (req, res) => {
  let pdf1 = req.files[0].path;
  let pdf2 = req.files[1].path;
  let merged = await mergePDF(pdf1, pdf2);
  res.redirect(`http://localhost:${port}/${merged}`);
  let fileLocation = path.join(__dirname, merged);
  setTimeout(() => {
    fs.unlinkSync(pdf1);
    fs.unlinkSync(pdf2);
    fs.unlinkSync(fileLocation);
  }, 1000);
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
