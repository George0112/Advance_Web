
var obj = JSON.parse(videos);

console.log(obj[0].videoId);

var row = document.querySelector(".videospan");

for(var i=obj.length-1;i>=0;i--){
  var tag = document.createElement('div');
  tag.className = "col col-md-4 col-lg-3 frame";
  row.insertBefore(tag, row.childNodes[0]);
  var thumbnail = document.createElement('div');
  thumbnail.className = "thumbnail";
  tag.insertBefore(thumbnail, tag.childNodes[0]);

  var caption = document.createElement('div');
  caption.className = "caption";
  thumbnail.insertBefore(caption, thumbnail.childNodes[0]);
  var img = document.createElement('img');
  img.src = `http://img.youtube.com/vi/${obj[i].videoId}/0.jpg`;

  thumbnail.insertBefore(img, thumbnail.childNodes[0]);

  var content = document.createElement('p');
  var stringcontent = obj[i].time;
  var contenttext = document.createTextNode(stringcontent);
  content.appendChild(contenttext);
  caption.insertBefore(content, caption.childNodes[0]);

  var title = document.createElement('h3');
  var stringtitle = obj[i].title;
  var titletext = document.createTextNode(stringtitle);
  title.appendChild(titletext);
  caption.insertBefore(title, caption.childNodes[0]);
}
