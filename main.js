function getTags(url) {
// http://content.guardianapis.com/music/2015/sep/23/the-playlist-indie-diiv-jennylee-deerhunter-and-more
var request = new XMLHttpRequest();
  request.open("GET", url + "?show-tags=keyword&api-key=test", false);
  // console.log(url + "?show-tags=keyword&api-key=test");
  request.send(null);
  var data = JSON.parse(request.responseText);
  // console.log(data);
  // var results = data['response']['content']['tags'][0]['id'];



function mapping(array){
    return (array.webTitle);
}


  return data.response.content.tags.map(mapping);
  // return data2.collection.map(mappingsongs);

  // return data2.collection.title.map(mapping);
}
var testurl = "http://content.guardianapis.com/music/2015/sep/23/the-playlist-indie-diiv-jennylee-deerhunter-and-more";
console.log(getTags(testurl));

function mappingsongs(array2){
  return (array2.title);
}


var request2 = new XMLHttpRequest();
  request2.open("GET", "http://api.soundcloud.com/search?q=taylor%20swift&client_id=a2b378fe2c15350323249b3ab162e4bf", false);
  // console.log(url + "?show-tags=keyword&api-key=test");
  request2.send(null);
  var data2 = JSON.parse(request2.responseText);
  var y = data2.collection.map(mappingsongs);
  // var x=data2['collection'][0]['title'];
