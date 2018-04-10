var row = document.querySelector(".row");

for(var i=0;i<9;i++){
  var tag = document.createElement('div');
  tag.className = "col col-md-4 col-lg-3";
  row.insertBefore(tag, row.childNodes[0]);
  var thumbnail = document.createElement('div');
  thumbnail.className = "thumbnail";
  tag.insertBefore(thumbnail, tag.childNodes[0]);

  var caption = document.createElement('div');
  caption.className = "caption";
  thumbnail.insertBefore(caption, thumbnail.childNodes[0]);
  var img = document.createElement('img');
  img.src = "http://img.youtube.com/vi/duURQsinObA/0.jpg";
  thumbnail.insertBefore(img, thumbnail.childNodes[0]);

  var content = document.createElement('p');
  var contenttext = document.createTextNode("asdasdasdasdasdasdasd");
  content.appendChild(contenttext);
  caption.insertBefore(content, caption.childNodes[0]);

  var title = document.createElement('h3');
  var titletext = document.createTextNode("title1");
  title.appendChild(titletext);
  caption.insertBefore(title, caption.childNodes[0]);
}
