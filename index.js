 const http= require("http")
 const url=require("url")
 const fs=require("fs");
 const replaceTemplate = require('./modules/replaceTemplate');
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8")
const templateOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,"utf-8");
const templateProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,"utf-8");
const templateCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,"utf-8")
const server=http.createServer((request,response)=>{

const pathName=request.url
const productData=JSON.parse(data);


    if( pathName==="/" || pathName==="/overview"){
        response.writeHead(200,{"Content-type":"text/html"});
        const cardsHTML=productData.map(product=>replaceTemplate(templateCard,product)).join("")
        const output=templateOverview.replace(/{%PRODUCT_CARDS%}/g,cardsHTML)         
        response.end(output);
    }
    else if(pathName==="/product"){
        response.end("templateProduct")
    }
    else if(pathName==="/api"){
        
            response.writeHead(200,{
                "Content-type":"application/json"
            })
            response.end(data)

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

