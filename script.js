
var url=window.location.href;

function add_subtitude(){
    json = JSON.parse(subtitle);
    $.each(json[0].transcripts, function(index, d){
        //var sub = "<a class='list-group-item' onclick='playAt(" + parseInt(d.t)/1000 + ", " + d.d + " )' id='subtitle" + index + "'>" + d.text + "</a>"
		var sub = "<a class='list-group-item' onclick='playAt(" + index + " )' id='subtitle" + index + "'>" + d.text + "</a>"
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
var currentSubtitle = 0;
function onPlayerStateChange(event) {
    console.log(event.data);
    if (event.data == YT.PlayerState.PLAYING && !done) {
		doneTimeOut = setTimeout(function(){
			player.pauseVideo();
		}, duration);
        done = true;
        console.log('stateChange and not done, duration = ' + duration);
    }else if (event.data == YT.PlayerState.PLAYING){
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

function playAt(index) {
	if(typeof(doneTimeOut)!=='undefined')clearTimeout(doneTimeOut);
	if(typeof(changeTimeOut)!=='undefined')clearTimeout(changeTimeOut);
	if(typeof(renderTimeOut)!=='undefined')clearTimeout(renderTimeOut);
	$("#underSubtitles").text(json[0].transcripts[index].text);
	$(".list-group-item").each(function(){
        $(this).css("background-color", "white");
    });
	$('#subtitle'+index).css("background-color", "#bfbfbf");
	currentSubtitle = index;
	second = parseInt(json[0].transcripts[index].t)/1000;
	d = json[0].transcripts[index].d;
	duration = d-1;
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
	while (currentTime-json[0].transcripts[i].t >= 0){
		i++;
	}
	i--;
	if(i==-1)i=0;
	$("#underSubtitles").text(json[0].transcripts[i].text);
	$(".list-group-item").each(function(){
        $(this).css("background-color", "white");
    });
	$('#subtitle'+i).css("background-color", "#bfbfbf");
    currentSubtitle = i;
}

function renderSubtitle(){
    //var i = searchForSubtitle();
	searchForSubtitle();
	if(typeof(doneTimeOut)!=='undefined')clearTimeout(doneTimeOut);
	if(typeof(changeTimeOut)!=='undefined')clearTimeout(changeTimeOut);
	if(typeof(renderTimeOut)!=='undefined')clearTimeout(renderTimeOut);
    //$("#underSubtitles").text(json[0].transcripts[i].text);
	if(player.getPlayerState()==1){
		renderTimeOut = setTimeout(function(){
			currentSubtitle++;
			changeState = false;
			changeSubtitle();
		}, json[0].transcripts[currentSubtitle+1].t-parseInt(player.getCurrentTime()*1000));
	}
}

function changeSubtitle(){
	if(player.getPlayerState()==1 && changeState == false){
		$("#underSubtitles").text(json[0].transcripts[currentSubtitle].text);
		$(".list-group-item").each(function(){
			$(this).css("background-color", "white");
		});
		$('#subtitle'+currentSubtitle).css("background-color", "#bfbfbf");
		changeTimeOut = setTimeout(function(){
			currentSubtitle++;
			changeSubtitle();
		}, json[0].transcripts[currentSubtitle+1].t-parseInt(player.getCurrentTime()*1000));
	}
}

function repeat(){
    if(typeof(doneTimeOut)!=='undefined')clearTimeout(doneTimeOut);
	if(typeof(changeTimeOut)!=='undefined')clearTimeout(changeTimeOut);
	if(typeof(renderTimeOut)!=='undefined')clearTimeout(renderTimeOut);
    done = true;
	playAt(currentSubtitle);
	repeatFlag = true;
}

function stopRepeat(){
    //player.pauseVideo();
    repeatFlag = false;
}