
var obj = JSON.parse(videos);


var row = document.querySelector(".videospan");
var url=window.location.href;
console.log(url);
for(var i=obj.length-1;i>=0;i--){
  var tag = document.createElement('div');
  var id = 'id' + i;
  tag.id = id;
  tag.className = `col col-md-4 col-lg-3 frame`;
  row.insertBefore(tag, row.childNodes[0]);
  var thumbnail = document.createElement('div');
  thumbnail.className = "thumbnail";
  tag.insertBefore(thumbnail, tag.childNodes[0]);
//caption


  var caption = document.createElement('div');
  caption.className = "caption";
  thumbnail.insertBefore(caption, thumbnail.childNodes[0]);
  

  var photo=document.createElement('div');
  photo.className = "photo";
  thumbnail.insertBefore(photo, thumbnail.childNodes[0]);

  var img = document.createElement('img');
  img.src = `http://img.youtube.com/vi/${obj[i].videoId}/0.jpg`;
  photo.insertBefore(img, photo.childNodes[0]);
////////////////////////time label////////////////////////////
  var timelable=document.createElement('span');
  timelable.className="label photolabel label-inverse";
  photo.insertBefore(timelable, img.nextSibling);

  var videoTime=document.createElement('span');
  var stringcontent = obj[i].time;
  videoTime.className="video-time";
  videoTime.innerHTML = obj[i].time.length>4?obj[i].time:"0"+obj[i].time;
  timelable.insertBefore(videoTime, timelable.childNodes[0]);
////////////////////////time label////////////////////////////
////////////like///////////////////////////////////////////// 
var likelable=document.createElement('span');
  likelable.className="label likelabel label-inverse";
  photo.insertBefore(likelable, img.nextSibling);

var like=document.createElement('a');
like.className="like";
like.href="javascript::";
like.id="likeId"+i;
likelable.insertBefore(like,likelable.childNodes[0]);

var fill_heart=document.createElement('i');
fill_heart.className="fas fa-heart fill";
like.insertBefore(fill_heart,like.childNodes[0]);

var vacant_heart=document.createElement('i');
vacant_heart.className="far fa-heart vac";
like.insertBefore(vacant_heart,fill_heart);

var like_text=document.createElement('span');
like_text.innerHTML="我喜歡";
like.insertBefore(like_text,fill_heart.nextSibling);
/////////////like//////////////////////////
//img-link
  var imglink = document.createElement('a');
  imglink.href = `./video.html?id=${obj[i].videoId}`;
  thumbnail.insertBefore(imglink, thumbnail.childNodes[0]);

//img
  // var img = document.createElement('img');
  // img.src = `http://img.youtube.com/vi/${obj[i].videoId}/0.jpg`;
  imglink.insertBefore(photo, imglink.childNodes[0]);

//button
  var thumbnailtag = document.createElement('p');
  caption.insertBefore(thumbnailtag, caption.childNodes[0]);

  var button1 = document.createElement('a');
  button1.className = "btn btn-warning btn-tag";
  var stringbutton = "美國腔";
  var buttontext1 = document.createTextNode(stringbutton);
  button1.appendChild(buttontext1);
  thumbnailtag.insertBefore(button1, thumbnailtag.childNodes[0]);

  var button2 = document.createElement('a');
  button2.className = "btn btn-success btn-tag";
  var stringbutton2 = "中文";
  var buttontext2 = document.createTextNode(stringbutton2);
  button2.appendChild(buttontext2);
  thumbnailtag.insertBefore(button2, thumbnailtag.childNodes[0]);
// //like
//   var like = document.createElement('a');
//   like.className = "btn btn-default btn-like";
//   var stringlike = "Like";
//   var liketext = document.createTextNode(stringlike);
//   like.appendChild(liketext);
//   caption.insertBefore(like, caption.childNodes[0]);

//   var likeicon = document.createElement('i');
//   likeicon.className = "far fa-heart";
//   like.insertBefore(likeicon, like.childNodes[0]);
//time
  var content = document.createElement('p');
  content.className = "timedisplay";
  var stringcontent = obj[i].time;
  var contenttext = document.createTextNode(stringcontent);
  content.appendChild(contenttext);
  caption.insertBefore(content, caption.childNodes[0]);
//title-link
  var textlink = document.createElement('a');
  textlink.href = `./video.html?id=${obj[i].videoId}`;
  textlink.className = "title";
  caption.insertBefore(textlink, caption.childNodes[0]);
//title
  var title = document.createElement('h3');
  var stringtitle = obj[i].title;
  var titletext = document.createTextNode(stringtitle);
  title.appendChild(titletext);
  textlink.insertBefore(title, textlink.childNodes[0]);
//title-tooltip
  var tooltip = document.createElement('span');
  var stringtootip = obj[i].title;
  var tootiptext = document.createTextNode(stringtootip);
  tooltip.appendChild(tootiptext);
  tooltip.className = "tooltip";
  caption.insertBefore(tooltip, caption.childNodes[0]);

}

window.onload = function() {
  /////////////like/////////////////////////
    for(var i=0;i<obj.length;i++){
      var selects = document.querySelector("#likeId"+i);
          selects.onclick=function (){
          if(this.querySelector(".vac").style.display=="inline-block"||this.querySelector(".vac").style.display==""){
            this.querySelector(".vac").style.display="none";
            this.querySelector(".fill").style.display="inline-block";
          }else{
            this.querySelector(".vac").style.display="inline-block";
            this.querySelector(".fill").style.display="none";
          }
        }
      }

  ////////////////////////////////////
///////////////back_to_top/////////////////////////////////////////////

    
    var obtn = document.getElementById('back_to_top');
    var timer = null;
    var isTop = true;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  
    window.onscroll = function(){
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (osTop >= clientHeight) {
              // obtn.style.display = 'block';
              obtn.style.opacity = 1;
            }else{
                // obtn.style.display = 'none';
                obtn.style.opacity = 0;
            }
        
        if (!isTop) {
              clearInterval(timer);
        }
        isTop = false;
    };
    
    obtn.onclick = function(){
        timer = setInterval(function(){
            var osTop = document.documentElement.scrollTop || document.body.scrollTop; 
            var isSpeed = Math.floor(-osTop / 7);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed;
                        

            isTop = true;
            if (osTop == 0) {
                clearInterval(timer);
            }
        },30);
    };
   
///////////////back_to_top/////////////////////////////////////////////
}
var submit = document.querySelector(".index-input-btn");
submit.addEventListener("click", function() {
    var input = document.querySelector(".index-input-banner");
    var substring = input.value.toLowerCase();
    for(var i=obj.length-1;i>=0;i--){
      var title = obj[i].title.toLowerCase();
      var id = 'id'+ i;
      var current = document.querySelector(`#${id}`);
      console.log(current.id);
      if(title.search(substring) >= 0){
        console.log(title);
        current.className = "col col-md-4 col-lg-3 frame ";
      }else{
        current.className = "hidden";
      }
    }
});
