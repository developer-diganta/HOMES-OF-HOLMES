const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/holmes",{useNewUrlParser: true});

const detectiveschema = new mongoose.Schema({
  name:String,
  case1:String,
  case2:String

});

const Detective= mongoose.model("Detective",detectiveschema);

app.get("/",function(req,res){
  res.render("index");
})

var name;


// app.post("/signup",function(req,res){
//     name=req.body.Name;
//     console.log(name);
//     res.render("user",{name:name});
// })


app.post("/login",function(req,res){
  var name = req.body.Name;
  var id = req.body.id;
  console.log(id);
  Detective.findOne({_id:id}, function(err, found){
    if(found==null){
     res.render("idfail");
    }

    else{
      if(found.name==name){
        if(found.case1=="N" && found.case2=="N"){
          res.render("user",{name:found.name,id:found._id,});
        }

        else if(found.case1=="Y" && found.case2=="N"){
          res.render("homes",{name:found.name,id:found._id,btn:">Home 1 : Mr. Krook (House of murder)-Solved",btn2:"Home 2 : Mrs. Sara (House of house of lost ring)"});

        }
        else{

          res.render("homes",{name:found.name,id:found._id,btn:">Home 1 : Mr. Krook (House of murder)",btn2:"Home 2 : Mrs. Sara (House of house of lost ring)-Solved"});

        }
      }
      else
        console.log("Fishy");
    }
  })
})

app.get("/users/home/:custom",function(req,res){
  var name=req.params.custom;
  console.log(name);
})


app.post("/signup",function(req,res){
    let id;
    var newDetec=new Detective({
      name:req.body.Name,
      case1:"N",
      case2:"N"
    })
     newDetec.save(function(err){
    id=newDetec._id;
    console.log(id);
    console.log(newDetec.case1);
    res.render("user",{name:req.body.Name, id:id});

    });
    console.log(id);
});


app.post("/home",function(req,res){
  var choice = req.body.name;

  var id = req.body.id;



  if(choice === "Home1"){
    Detective.findOne({_id:id},function(err, found){

        res.render("home1",{id:id,name:found.name});

  });
}

  else{
    Detective.findOne({_id:id},function(err, found){
        res.render("home2",{id:id,name:found.name});
    })

}

})

// app.get("/new/:name"){
//
//   const name=req.params.name;
//   Detective.findOne({name:})
//
// }


app.post("/time-to-choose/:id",function(req,res){

  res.render("homes",{id:req.params.id,btn:"Home 1 : Mr. Krook (House of murder)",btn2:"Home 2 : Mrs. Sara (House of house of lost ring)"});



})



app.post("/home1/round1",function(req,res){
  res.render("round1",{id:req.body.id});
})


app.post("/home1/h2r1",function(req,res){
  res.render("hround1",{id:req.body.id});
})

app.post("/home1/round1-solve",function(req,res){
  var ans1=req.body.ques1;
  var ans2=req.body.ques2;
  var ans3=req.body.ques3;

  var id=req.body.id;

  if(ans1==9 && ans2==39 && ans3==1){
    res.render("round2",{id:id});
    console.log("new");
  }

  else{
    res.render("lost");
  }
})



app.get("/round3/:id",function(req,res){
  var id=req.params.id;
  console.log(id);
  res.render("round3",{id:id});
})

app.get("/hround3/:id",function(req,res){
  var id=req.params.id;
  console.log(id);
  res.render("hround3",{id:id});
})


app.post("/round3-solve",function(req,res){
  var id=req.body.id;
  var ans=req.body.ques3;
  console.log(id);
  if(ans=="two"){
    res.render("final",{id:id});
  }
  else{
      res.render("lost");
  }
})



app.post("/hround3-solve",function(req,res){
  var id=req.body.id;
  var ans=(req.body.q3).toLowerCase();
  console.log(id);
  if(ans=="bookkeeper"){
    res.render("hfinal",{id:id});
  }
  else{
      res.render("lost");
  }
})




app.post("/evaluate",function(req,res){
  var id=req.body.id;
  var id1=req.body.id1;
  if(id==id1){
    // Detective.findOneAndUpdate({_id:id},function(err, found){
    //   console.log(found);
    //   found.case1="Y";
    //   found.save();
    // })
    Detective.updateOne({_id:id},{case1:"Y"},function(err){
      if(err){
        console.log("Error");
      }
      else
      console.log("Update");
    })
    res.render("home1solved");
  }
  else{
    res.render("wrong");
  }
})

app.post("/hevaluate",function(req,res){
  var id=req.body.id;
  var id1=req.body.id1;
  if(id==id1){
    // Detective.findOneAndUpdate({_id:id},function(err, found){
    //   console.log(found);
    //   found.case1="Y";
    //   found.save();
    // })
    Detective.updateOne({_id:id},{case2:"Y"},function(err){
      if(err){
        console.log("Error");
      }
      else
      console.log("Update");
    })
    res.render("home2solved");
  }
  else{
    res.render("wrong");
  }
})



app.post("/home1/r1solve",function(req,res){
  var ans1=req.body.ques1;
  var ans2=req.body.ques2;
  var ans3=req.body.ques3;

  var id=req.body.id;

  if(ans1==51 && ans2==4 && ans3==253){
    res.render("hround2",{id:id});
    console.log("new");
  }

  else{
    res.render("lost");
  }
})



app.get("/solvers",function(req,res){

  var sol=[];
  Detective.find({},function(err,found){
    for(var i=0;i<found.length;i++){
      if(found[i].case1=="Y" || found[i].case=="N"){
        sol.push(found[i].name);
      }
    }

    res.render("solvers",{sol:sol});
  })


})




app.get("/about",function(req,res){
  res.render("about");
})








app.listen(process.env.PORT || 3000,function(){
  console.log("Running on 3000");
});
