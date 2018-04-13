
var url=window.location.href;

function add_subtitude(){
    json = JSON.parse(subtitle);
    $.each(json[0].transcripts, function(index, d){
        var sub = "<a class='list-group-item' onclick='playAt(" + parseInt(d.t)/1000 + ", " + d.d + " )' id='subtitle" + index + "'>" + d.text + "</a>"
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
var interval;
var repeatFlag = false;
var firstRepeat = true;
function onPlayerStateChange(event) {
    console.log(event.data);
    if (event.data == YT.PlayerState.PLAYING && !done) {
        doneTimeOut = setTimeout(function(){
			player.pauseVideo();
		}, duration);
        done = true;
        console.log('stateChange and not done, duration = ' + duration);
    }
	else if (event.data == YT.PlayerState.PLAYING){
		changeState = true;
		renderSubtitle();
    }else if(event.data == YT.PlayerState.PAUSED && repeatFlag){
        console.log('repeat')
        repeat();
    }
    
}

function stopVideo() {
    player.stopVideo();
}

function playAt(second, d) {
	duration = d;
    player.seekTo(second, 1);
	done = false;
    player.playVideo();
    console.log("playAt()");
    console.log(second + " " + d);
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
    return i;
}

function renderSubtitle(){
    var i = searchForSubtitle();
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

function repeat(){
    if(typeof(doneTimeOut)!=='undefined')clearTimeout(doneTimeOut);
    done = true;
    if(!YT.PlayerState.PLAYING) return;
    var i = searchForSubtitle();
    if(!firstRepeat) i--;
    firstRepeat = false;
    var id = "subtitle" + i;
    console.log(i);
    playAt(parseInt(json[0].transcripts[i].t)/1000, parseInt(json[0].transcripts[i].d));
    console.log(id);
    console.log(json[0].transcripts[i].d-20);
    repeatFlag = true;
}

function stopRepeat(){
    player.stopVideo();
    repeatFlag = false;
}