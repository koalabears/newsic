function createSoundcloudQuery(tags) {

  var out = "http://api.soundcloud.com/search?q=";
  for (var j = 0; j < tags.length && j < 2; j++) {
    out += tags[j]
    if (j !== tags.length - 1) {
      out += "%20";
    }
  }
  out += "&client_id=a2b378fe2c15350323249b3ab162e4bf";
  return out.replace(/ /g, "%20");
}


function getTrackUrl(data){
  var songUrl, type;
  var i = 0;
  do {
    type = data.collection[i].kind;
    songUrl = data.collection[i].uri;
    i++;
  } while (type !== "track")
  return songUrl;
}

function URLFromResponse(responseText) {
  var data = JSON.parse(responseText);
  songUrl = getTrackUrl(data);
  return "https://w.soundcloud.com/player/?url=" + songUrl + "&color=0066cc";
}

function generateURL(tags_array) {

  //console.log(tags_array);
  var url_api = createSoundcloudQuery(tags_array);
  // creates Soundcloud API link
  console.log(url_api);
  var request = new XMLHttpRequest();
  request.open("GET", url_api, false);
  request.send(null);
  // generates the url for soundcloud player
  return URLFromResponse(request.responseText);
}


function initPlayer(player, tags) {

  var songURL = generateURL(tags);
  // replaces the src part of the soundcloudvid1 div with url_player
  player.setAttribute('src', songURL);
}
