const fs = require("node:fs");

fs.mkdirSync("./android/app/src/main/assets", { recursive: true });
console.log("Diretorio criado.");
