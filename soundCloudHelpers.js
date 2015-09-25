// The functions on this file are creating / extraction info from soundcloud
// queries. ie helper functions

function createSoundcloudQuery(tags) {
//adds upto 2 tags to url
  var out = "http://api.soundcloud.com/search?q=";
  for (var j = 0; j < tags.length && j < 2; j++) {
    out += tags[j];
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
    if (i >= data.collection.length) return ;
    type = data.collection[i].kind;
    songUrl = data.collection[i].uri;
    i++;
  } while (type !== "track")
  return songUrl;
}

function URLFromResponse(responseText) {
  var data = JSON.parse(responseText);
  songUrl = getTrackUrl(data);
  if (songUrl)
    return "https://w.soundcloud.com/player/?url=" + songUrl + "&color=0066cc";
  else
    return ;
}
