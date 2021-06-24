const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));


app.get("/",function(request,response){
	response.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo",async function(request,response){
	const videoURL = request.query.videoURL;
	const info = await ytdl.getInfo(videoURL);
	response.status(200).json(info);
});

app.get("/download",function(request,response){
	const videoURL = request.query.videoURL;
	const itag = request.query.itag;
	response.header("Content-Disposition",'attachment;\ filename="video.mp4"');
	ytdl(videoURL,{
		filter: format => format.itag == itag
	}).pipe(response);
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
