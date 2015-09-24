var temp;

function createSoundcloudQuery(tags) {
  var out = "http://api.soundcloud.com/search?q=";
  for(var j = 0; j < tags.length && j < 2; j++) {
    out += tags[j]
    if(j !== tags.length - 1){
      out += "%20";
    }

  }
  out += "&client_id=a2b378fe2c15350323249b3ab162e4bf";
  return out.replace(/ /g, "%20");
}

var j=0;
function generateURL(tags_array) {
  j++;
  if (j==4)
    console.log("!");

  console.log(tags_array);
  var type, songUrl, i;
  //var url_temp = "http://api.soundcloud.com/search?q=" + tags_array[0] + "%20" + tags_array[1] + "%20" + tags_array[2]+ "&client_id=a2b378fe2c15350323249b3ab162e4bf";
  var url_api = createSoundcloudQuery(tags_array);
  // creates Soundcloud API link
  console.log(url_api);
  var request2 = new XMLHttpRequest();
  request2.open("GET", url_api, false);
  request2.send(null);
  var data2 = JSON.parse(request2.responseText);
  i = 0;
  var arraySongURIs = data2.collection.map(mappingsongs);
  do {
    type = data2.collection[i].kind;
    songUrl = data2.collection[i].uri;
    i++;
  } while(type !== "track")

  // gets soundcloud API URIs and puts them in an array
  temp = data2;
  console.log(songUrl);

  return "https://w.soundcloud.com/player/?url=" + songUrl + "&color=0066cc"; // generates the url for soundcloud player

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
