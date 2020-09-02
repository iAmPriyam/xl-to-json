const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const { static } = require("express");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
    var files = {},
        struct = {
            name: null,
            type: null,
            size: 0,
            data: [],
            slice: 0,
        };
    console.log("new connection");
    socket.on("blob-upload", (data) => {
        if (!files[data.name]) {
            files[data.name] = Object.assign({}, struct, data);
            files[data.name].data = [];
        }

        //convert the ArrayBuffer to Buffer
        data.data = new Buffer.from(new Uint8Array(data.data));
        //save the data
        files[data.name].data.push(data.data);
        files[data.name].slice++;

        if (files[data.name].slice * 100000 >= files[data.name].size) {
            //do something with the data
            console.log("end");
            socket.emit("end upload");
        } else {
            socket.emit("request slice upload", {
                currentSlice: files[data.name].slice,
            });
            console.log("next\n");
        }
        if (files[data.name].slice * 100000 >= files[data.name].size) {
            var fileBuffer = Buffer.concat(files[data.name].data);

            fs.write(
                path.join(__dirname, "/tmp/" + data.name),
                fileBuffer,
                (err) => {
                    delete files[data.name];
                    if (err) return socket.emit("upload error");
                    socket.emit("end upload");
                }
            );
            console.log("file uploaded successfully");
        }
    });
});
app.use(static(path.join(__dirname, "/public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

server.listen(3000, () => {
    console.log("listening to port 3000");
});
