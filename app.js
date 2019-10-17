var express = require("express"),
	bodyParser = require("body-parser"),
	app = express(),
	mongoose = require("mongoose");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/SBH_demo", { useNewUrlParser: true });

var teamSchema = new mongoose.Schema({
	teamName: String,
	collegeName: String,
	collegeID: String,
	teamLeader: String,
	member1: String,
	member2: String,
	member3: String,
	phnNo: String,
	Email: String,
	ideaTitle: String,
	ideaLink: String,
	ideaAbstract: String
})

var Team = mongoose.model("Team", teamSchema);

// ROOT Route - Redirect to SBH route
// ===================================================================
app.get("/", function(req, res){
	res.redirect("/sbh");
});
// ROOT Route ends here
// ===================================================================



// SBH route
// ==================================================================
app.get("/sbh", function(req, res){
	res.render("index");
});
// SBH route ends here
// ==================================================================




// ===================================================================
// REGISTER Routes start here

// Show registeration form
app.get("/sbh/register", function(req, res){
	res.render("register");
});

app.post("/sbh/register", function(req, res){
	// var save = true;
	Team.find({teamName: req.body.teamName}, function(err, team){
		if (err){
			console.log("Something Went wrong");
		} else {
			if (team.length != 0){
				// save = false;
				console.log(team.length);
				res.send("<h1>Team with the name " + req.body.teamName + " is already registered!<h1>");
			} else {
				Team.find({Email: req.body.email}, function(err, team1){
				if (err){
					console.log("Something Went wrong");
				} else {
						if (team1.length != 0){
							// save = false;
							res.send("<h1>Email id " + req.body.email + " is already registered!</h1>");
						} else {
							saveToDb(req.body);
							res.send("<h1> Team saved to Database </h1>")
						}
					}
				});
			}
		}
	});
	
	
	
			
});

function saveToDb(obj){

	var teamToBeAdded = new Team({
		teamName: obj.teamName,
		collegeName: obj.collegeName,
		collegeID: obj.collegeId,
		teamLeader: obj.teamLeader,
		member1: obj.teamMember1,
		member2: obj.teamMember2,
		member3: obj.teamMember3,
		phnNo: obj.phoneNumer,
		Email: obj.email,
		ideaTitle: obj.ideaTitle,
		ideaLink: obj.ideaLink,
		ideaAbstract: obj.abstract
	});

	teamToBeAdded.save(function(err, teamSaved){
		if (err){
			console.log("Something went wrong!");
		} else {
			console.log("We just saved a team to the databse");
			console.log(teamSaved);
		}
	})
}

// REGISTER Routes End here
// ====================================================================



// ====================================================================
// LOGIN Routes start here

// show login form
app.get("/sbh/login", function(req, res){

});

// forms submits to this route
app.post("/sbh/login", function(req, res){

});

// LOGIN Routes end here
// ====================================================================



app.get("*", function(req, res){
	res.send("invalid url Error 404!");
})

app.listen(3000, function(){
	console.log("app listening at port 3000");
})