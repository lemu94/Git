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
        const getDir = blobName.substring(0,nbCharDir);
        const nameFilePath = blobName.substring(nbCharDir);

        if(arg == "-p"){
        fs.readFile(`.git/objects/${getDir}/${nameFilePath}`, (err, buffer) => {
          if (err) throw err;
            zlib.inflate(buffer, (err, result) => {
            if (err)  throw err;
                const idx = result.indexOf(0); // 0 = '\x00'

              if (idx === -1) {
                  console.error("Format inconnu !");
                  return;
               }

              // Récupère uniquement le contenu après le \x00
              const contenu = result.slice(idx + 1).toString('utf8');
              const contenuNettoye = contenu.trimEnd();
              console.log(contenuNettoye);
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
