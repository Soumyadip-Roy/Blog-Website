//006

const fs = require("fs");

//where to resad data from
const readStream = fs.createReadStream("./docs/ninja.txt", {
  encoding: "utf8",
});
const writeStream = fs.createWriteStream("./docs/writeStream.txt");

//on is an eventListner - data event is fired everytime a data is recieved

// readStream.on("data", (chunk) => {
//   console.log("new chunk");
//   // console.log(chunk.toString());
//   console.log(chunk);

//   writeStream.write("\nNEW CHUNK\n");

//   writeStream.write(chunk);
// });


//piping - alternate to above 
readStream.pipe(writeStream);
