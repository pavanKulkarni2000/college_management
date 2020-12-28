const mysql = require("mysql")


const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"collegeSpace",
})

db.connect(function(err){
    if(err)
        return console.log(err)
})

module.exports=db