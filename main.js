function generateURL(tags_array) {
  var url_temp = "http://api.soundcloud.com/search?q=" + tags_array[0] + "%20" + tags_array[1] + "%20" + tags_array[2]+ "&client_id=a2b378fe2c15350323249b3ab162e4bf";
  var url_api = url_temp.replace(/ /g, "%20");
  // creates Soundcloud API link

  var request2 = new XMLHttpRequest();
  request2.open("GET", url_api, false);
  request2.send(null);
  var data2 = JSON.parse(request2.responseText);
  var arraySongURIs = data2.collection.map(mappingsongs);
  // gets soundcloud API URIs and puts them in an array

  return "https://w.soundcloud.com/player/?url=" + arraySongURIs[0] + "&color=0066cc"; // generates the url for soundcloud player

}

function initPlayer(player, tags) {
    // var articles = getArticles();
    // var tags = articles[0].tagsArray;
    var songURL = generateURL(tags);
    player.setAttribute('src', songURL);     // replaces the src part of the soundcloudvid1 div with url_player
}

  function mapping(array){
    return (array.webTitle);
  }

//   return data.response.content.tags.map(function(elem) {
//       return elem.webTitle;
//   }).filter(function(elem) {
//       return !(elem === "Music" || elem === "Culture");
//   });


// var testurl = "http://content.guardianapis.com/music/2015/sep/23/the-playlist-indie-diiv-jennylee-deerhunter-and-more";
// console.log(getTags(testurl));
//
//

// initPlayer();

//
// getArticles().forEach(function(elem) {
//   console.log(elem[0]);
//   console.log("    " + elem[1]);
//   for (i=0; i<elem[1].length;i++){
//   if (elem[1][i].includes('Mozart')){
//     console.log("hello");
//     console.log(elem[1][i]);
//   }
//
//
//
//
//
// }
// });
//


function mappingsongs(array2){
  return (array2.uri);
}
//
//

// var tags=["kurt", "cobain"];
