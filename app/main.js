const fs = require("fs");
const zlib = require('zlib');
const path = require("path");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.error("Logs from your program will appear here!");

 const command = process.argv[2];

 switch (command) {
   case "init":
        createGitDirectory();
    break;

    case "cat-file":
        const nbCharForName = 38;
        const arg = process.argv[3]
        const blobName = process.argv[4];
        const nbCharBlob =process.argv[4].length;
        const nbCharDir = (nbCharBlob - nbCharForName);
        // process.arg[4].length;
        const getDir = blobName.substring(0,nbCharDir);
        const nameFilePath = blobName.substring(nbCharDir);
        console.log(getDir)
        console.log(nameFilePath)

        if(arg == "-p"){
        fs.readFile(`.git/objects/${getDir}/${nameFilePath}`, (err, buffer) => {
          if (err) throw err;
            zlib.gunzip(buffer, (err, result) => {
            if (err) throw err;
              const contenu = result.toString('utf8');
              console.log(contenu);
            });
          });
        }

    break;

    default:
        throw new Error(`Unknown command ${command}`);
 }

 function createGitDirectory() {
   fs.mkdirSync(path.join(process.cwd(), ".git"), { recursive: true });
   fs.mkdirSync(path.join(process.cwd(), ".git", "objects"), { recursive: true });
   fs.mkdirSync(path.join(process.cwd(), ".git", "refs"), { recursive: true });

   fs.writeFileSync(path.join(process.cwd(), ".git", "HEAD"), "ref: refs/heads/main\n");
   console.log("Initialized git directory");
 }
