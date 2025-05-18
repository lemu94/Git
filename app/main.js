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
        const arg = process.argv[3]
        const filePath = process.argv[4];
        const getDir = filePath.substring(0,2);
        if(arg == "-p"){
        fs.readFile(`.git/objects/${getDir}/${filePath}`, (err, buffer) => {
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
