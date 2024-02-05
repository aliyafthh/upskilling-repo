const fs = require('fs'); //fs = file system

//encoding will change the data to toString (readable format)
const readStream = fs.createReadStream('./docs/blog3.txt',{ encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

//on -> event listener
// everytime receive buffer (small package of data)
// readStream.on("data", (chunk) => {
//   console.log("----- NEW CHUNK ----");
//   console.log(chunk);
//   writeStream.write("\nNEW CHUNK\n");
//   writeStream.write(chunk);
// });


//piping
//directly read & write to new file
readStream.pipe(writeStream);
