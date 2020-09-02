const file_input = document.querySelector("#file-upload");
let socket = io();

const upload = (file) => {
    let blob = file.slice(0, 100000);
    let file_reader = new FileReader();

    file_reader.readAsArrayBuffer(blob);

    file_reader.onload = (event) => {
        console.log("starting upload");
        var arrayBuffer = file_reader.result;
        socket.emit("blob-upload", {
            name: file.name,
            type: file.type,
            size: file.size,
            data: arrayBuffer,
        });
    };
    socket.on("request slice upload", (data) => {
        var place = data.currentSlice * 100000,
            slice = file.slice(
                place,
                place + Math.min(100000, file.size - place)
            );

        fileReader.readAsArrayBuffer(slice);
    });
};

file_input.addEventListener("change", (event) => {
    const files = event.target.files;
    console.log(files[0]);
    upload(files[0]);
});

socket.on("connect", (socket) => {
    console.log("connected to server");
});
