 
const fs=require("fs")
const text=fs.readFileSync("./txt/input.txt","utf-8")
const textOut="this is text about avocado " +text
fs.writeFileSync("./txt/output.txt",textOut);
console.log("file is written");