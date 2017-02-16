var express = require('express');
var app = express();

app.get("/", function(req, res){
	res.send("You must specify a deployment route")
});

app.get('/jazcss', function (req, res) {
	let output = "";
	const execSync = require("child_process").execSync;
	var gitOutput = execSync("git --git-dir=/var/www/jazcss/.git --work-tree=/var/www/jazcss pull", {
		encoding: "utf-8"
	});
	output += gitOutput;
	console.log(gitOutput);
	var gulpOutput = execSync("gulp build --gulpfile /var/www/jazcss/gulpfile.js", {
		encoding: "utf-8"
	});
	output += gulpOutput;
	console.log(gulpOutput);
	res.send(output);
});
app.listen(3033);

console.log('Listening on port 3033...');
