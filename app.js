//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useUnifiedTopology: true,  useNewUrlParser: true })


const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model('Article', articleSchema)


app.route('articles')
    .get(function(req, res){
        Article.find({}, function(err, result){
            if(!err){
                res.send(result)
            }else{
                res.send(err)
            }
        })
    })
    .post(function(req, res){
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save(function(err){
            if (!err){
                res.send('Success')
            }else{
                res.send(err)
            }
        })
    })
    .delete(function(req, res){
        Article.deleteMany({}, function(err){
            if (!err){
                console.log("deleted articles");
            }else{
                console.log(err);
            }
        })
    })



app.get('/articles', )

app.post('/articles', )


app.delete('/articles', )


app.route('/articles/:articleTitle')

.get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, result){
        if (result){
            res.send(result)
        }else{
            res.send('denied')
        }
    });
})

.put(function(req, res){
    Article.update(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err){
            if (!err){
                res.send('updated')
            }else{
                res.send('NOPE')
            }
    })
})

.patch(function(req, res){
    Article.update({title: req.params.articleTitle}, {$set: req.body}, function(err){
        if (!err){
            res.send("updated Only the specifieds ")
        }else{
            res.send('NONONO')
        }
    })
})

.delete(function(req, res){
    Article.deleteOne({title: req.params.articleTitle}, function(err){
        if (!err){
            res.send('deleted')
        }else{
            res.send("can't delete")
        }
    })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
