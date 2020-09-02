const express = require("express");
const upload = require("express-fileupload");
const { static } = require("express");
const path = require("path");
const data = require("./data");
const app = express();

// app.use(upload());
// app.use(static(path.join(__dirname, "/public")));

app.get("/data", (req, res) => {
    res.send(data);
});
app.get("/", (req, res) => {
    res.send(data);
});

// const fileUploader = (file) => {
//     return new Promise(function (resolve, reject) {
//         /**
//          * Check for allowed file types.
//          */

//         file.mv(path.join(__dirname, "../uploads", file.name), function (err) {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve({
//                 name: file.name,
//                 size: file.size,
//             });
//         });
//     });
// };

// app.post("/upload", function (req, res) {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send("No files were uploaded.");
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let sampleFile = req.files.sampleFile;

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(path.join(__dirname, `/tmp/${req.files.filename}`), function (
//         err
//     ) {
//         if (err) return res.status(500).send(err);

//         res.send("File uploaded!");
//     });
// });

app.listen(5000, () => {
    console.log("listening to port 5000");
});
