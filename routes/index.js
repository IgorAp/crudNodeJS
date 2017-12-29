var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e,docs)=>{
    if(e){
      return console.log(e);
    }
    res.render('index',{docs:docs});
  });
});

router.get('/new',function(req,res,next){
  res.render('new',{action:'/new',doc:{}});
});

router.post('/new',function(req,res,next){
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  global.db.insert({nome,idade},(err,result)=>{
    if(err){
      return console.log(err);
    }
    res.redirect('/?new=true');
  });
});

router.get('/edit/:id',function(req,res,next){
  global.db.findOne(req.params.id,(e,doc)=>{
    if(e){
      return console.log(e);
    }else{
      res.render('new',{doc:doc,action:'/edit/'+doc._id});
    }
  });
});

router.post('/edit/:id',function(req,res,next){
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);

  global.db.update(id,{nome,idade},(e,result)=>{
    if(e)return console.log(e);
    res.redirect('?/edit=true');
  });
})
router.get('/del/:id',(req,res)=>{
  var id = req.params.id;
  global.db.deleteOne(id,(e,r)=>{
    if(e)return console.log(e)
    res.redirect('/?delete=true');
  })
});

module.exports = router;
