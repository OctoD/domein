const cwd = __dirname;
const path = require("path");
const fs = require("fs");

const envfilecontent = [
  "#",
  "NODE_PATH=./",
].join("\n");
const envfilepath = path.join(cwd, ".env");

fs.writeFileSync(envfilepath, envfilecontent, {
  encoding: "utf-8"
});
