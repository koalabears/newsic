function getTags(url) {

  var request = new XMLHttpRequest();
  request.open("GET", url + "?show-tags=keyword&api-key=test", false);
  request.send(null);
  var data = JSON.parse(request.responseText);
  return data.response.content.tags.map(function(elem) {
      return elem.webTitle;
  }).filter(function(elem) {
      return !(elem === "Music" || elem === "Culture");
  });
}

function getArticles() {
  var url = "http://content.guardianapis.com/search?section=music&api-key=test"
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send(null);
  var data = JSON.parse(request.responseText);
    var articleObjs = data.response.results;
  var urls = articleObjs.map(function(elem) {
    return [elem.webTitle, getTags(elem.apiUrl)];
  });

  return urls;

}




var articleDate = getArticles();
var contentDiv = document.getElementsByClassName('content-main')[0];

articleDate.forEach( function(elem) {
  var newDiv = document.createElement('div');
  newDiv.className = "article";

  var contentLink = document.createElement('a');
  contentLink.href = 'dummyURL';

  var title = document.createElement('h3');
  title.innerHTML = elem[0];

  contentLink.appendChild(title);
  newDiv.appendChild(contentLink);
  contentDiv.appendChild(newDiv);
});
