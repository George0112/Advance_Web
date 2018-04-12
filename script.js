
var url=window.location.href;
console.log(url);

function add_subtitude(){
    json = JSON.parse(subtitle);
    $.each(json[0].transcripts, function(index, d){
        var sub = "<a class='list-group-item' onclick='playAt(" + parseInt(d.t)/1000 + ", " + d.d + " )'>" + d.text + "</a>"
        $(sub).appendTo('#subtitle');
    });
};

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

// load json file
var tag = document.createElement('script');

tag.src = "video" + getUrlParameter('index') + ".json";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '400',
        width: '100%',
        videoId: getUrlParameter('id'),
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = true;
var duration = 0;
var changeState = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(function(){
			player.pauseVideo();
		}, duration);
        done = true;
    }
	if (event.data == YT.PlayerState.PLAYING){
		changeState = true;
		searchForSubtitle();
	}
}
function stopVideo() {
    player.stopVideo();
}

function playAt(second, d) {
	duration = d;
    player.seekTo(second, 1);
	done = false;
	setTimeout(function(){
		player.pauseVideo();
		player.playVideo();
		console.log('play');
	}, 1);
    console.log("playAt()");
}

function searchForSubtitle(){
	var currentTime = parseInt(player.getCurrentTime()*1000);
	var minInterval = Number.MAX_VALUE;
	var i = 0;
	while (Math.abs(currentTime-json[0].transcripts[i].t) < minInterval){
		minInterval = Math.abs(currentTime-json[0].transcripts[i].t);
		i++;
	}
	i--;
	$("#underSubtitles").text(json[0].transcripts[i].text);
	if(player.getPlayerState()==1){
		setTimeout(function(){
			i++;
			changeState = false;
			changeSubtitle(i);
		}, json[0].transcripts[i+1].t-parseInt(player.getCurrentTime()*1000));
	}
}
function changeSubtitle(i){
	if(player.getPlayerState()==1 && changeState == false){
		$("#underSubtitles").text(json[0].transcripts[i].text);
		setTimeout(function(){
			i++;
			changeSubtitle(i);
		}, json[0].transcripts[i+1].t-parseInt(player.getCurrentTime()*1000));
	}
}