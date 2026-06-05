const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    fs.readdir(`./files`, function(err, files){
        // console.log(files); //this will log in terminal
        const fileNamesWithoutExtension = files.map(val => path.parse(val).name);
        res.render("index", {files: fileNamesWithoutExtension});
    })
})

app.post('/create', function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) =>{
        res.redirect("/")

    })

})

app.get('/files/:filename', function(req, res){

    fs.readFile(`./files/${req.params.filename}.txt`, "utf-8", function(err, filedata){
        
        if(err){
            console.log(err.message);
        }
        // console.log(filedata);
        res.render('show', {filedata: filedata, filename: req.params.filename});
    })
})

app.listen(3000);