
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
//img-link
  var imglink = document.createElement('a');
  imglink.href = `./video.html?id=${obj[i].videoId}`;
  thumbnail.insertBefore(imglink, thumbnail.childNodes[0]);

//img
  var img = document.createElement('img');
  img.src = `http://img.youtube.com/vi/${obj[i].videoId}/0.jpg`;
  imglink.insertBefore(img, imglink.childNodes[0]);

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
//like
  var like = document.createElement('a');
  like.className = "btn btn-default btn-like";
  var stringlike = "Like";
  var liketext = document.createTextNode(stringlike);
  like.appendChild(liketext);
  caption.insertBefore(like, caption.childNodes[0]);

  var likeicon = document.createElement('i');
  likeicon.className = "far fa-heart";
  like.insertBefore(likeicon, like.childNodes[0]);
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
  caption.insertBefore(textlink, caption.childNodes[0]);
//title
  var title = document.createElement('h3');
  var stringtitle = obj[i].title;
  var titletext = document.createTextNode(stringtitle);
  title.appendChild(titletext);
  title.className = "title";
  textlink.insertBefore(title, textlink.childNodes[0]);
//title-tooltip
/*
  var tooltip = document.createElement('p');
  tooltip.className = "tooltips";
  var stringtootip = obj[i].title;
  var tootiptext = document.createTextNode(stringtootip);
  tooltip.appendChild(tootiptext);
  title.insertBefore(tooltip, title.childNodes[0]);
*/
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
