function getTags(url) {

  var request = new XMLHttpRequest();
  request.open("GET", url + "?show-tags=keyword&api-key=test", false);
  request.send(null);
  var data = JSON.parse(request.responseText);
  // function mapping(array){
  //   return (array.webTitle);
  // }
  return data.response.content.tags.map(function(elem) {
      return elem.webTitle;
  }).filter(function(elem) {
      return !(elem === "Music" || elem === "Culture");
  });
}

// var testurl = "http://content.guardianapis.com/music/2015/sep/23/the-playlist-indie-diiv-jennylee-deerhunter-and-more";
// console.log(getTags(testurl));
//
//

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

getArticles().forEach(function(elem) {
  console.log(elem[0]);
  console.log("    " + elem[1]);
});



// function mappingsongs(array2){
//   return (array2.uri);
// }
//
//
// var request2 = new XMLHttpRequest();
//   request2.open("GET", "http://api.soundcloud.com/search?q=taylor%20swift&client_id=a2b378fe2c15350323249b3ab162e4bf", false);
//   // console.log(url + "?show-tags=keyword&api-key=test");
//   request2.send(null);
//   var data2 = JSON.parse(request2.responseText);
//   var y = data2.collection.map(mappingsongs);
//   // var x=data2['collection'][0]['title'];
