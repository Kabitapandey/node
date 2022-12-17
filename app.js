const http=require("http");
require("dotenv").config()
const readline=require("readline");
const bcryptjs=require("bcryptjs");
const express=require("express")
const app=express();

let encryptionKey;

// generationg the hashed value of encryption key
bcryptjs.genSalt(10,(err,salt)=>{
    bcryptjs.hash(process.env.KEY,salt,(err,hash)=>{
        encryptionKey=hash;
    })
})

// input from the user
const r1=readline.createInterface(process.stdin,process.stdout)


// server listening at port 3000
app.listen(3000,()=>{
    console.log("Server is listening at port 3000...");
    checkToken();
})



const checkToken=()=>{
    r1.question("Enter the key:\n",(key)=>{
        // comparing the ecryption key provided with the encryption key
        bcryptjs.compare(key,encryptionKey,(err,isMatch)=>{
            // if encryption key entered is valid than only the user can access the page
            if(isMatch){
                app.use(express.static("./public"))
            }

            else{
                console.log("Invalid key");
            }
        })
        r1.close()
    })
}