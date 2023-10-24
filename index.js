 const http= require("http")
 const url=require("url")
 const fs=require("fs");
const { dirname } = require("path");
const server=http.createServer((request,response)=>{
    const pathName=request.url
    if( pathName==="/" || pathName==="/overview"){
        response.end("This is an overview page.");
    }
    else if(pathName==="/product"){
        response.end("This is a product page.")
    }
    else if(pathName==="/api"){
        fs.readFile(`${__dirname}/dev-data/data.json`,"utf-8",(err,data)=>{
            const productData=JSON.parse(data);
            response.writeHead(200,{
                "Content-type:application/json"
            })
            response.end(productData)
        });

    }
    else{
        response.writeHead(404,{
        "Content-type":"text/html",
        "my-own-header":"Hey there"
        })
        response.end("<h1>Page not found.</h1>")
    }

});
server.listen(3001,"127.0.0.1",()=>{
    console.log("Listening to request on port 3001")
});

