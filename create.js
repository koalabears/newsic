// Find content + links from apis then dynamically create content!
// execution starts here
window.onload = createContent();

// main
function createContent() {
  document.getElementById('splash').addEventListener('click', splashClick);
  // get data of first ten music articles on guadian
  var url = "http://content.guardianapis.com/search?section=music&show-tags=keyword&api-key=test&show-fields=all&show-most-viewed=true";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        var data = JSON.parse(request.responseText);
        // NEXT CALL HERE
        // now go an ask for tag info on on each article
        initTagCalls(data);
      }
    }
  };
  request.send(null);
}

// ask the guardian for tag info for each article
function initTagCalls(data) {
  var articleObjs = data.response.results;
  articleObjs.forEach(function(elem) {
    var tagsArray = elem.tags.map(function(tagElem) {
      return tagElem.webTitle;
    });
    // NEXT CALL HERE
    generateSongURL(tagsArray, elem);
  });
}


// use tags to find song on soundcloud, keep data about articles so we can
// push all content to page later
function generateSongURL(tags_array, articleData) {
  // create the query
  var url_api = createSoundcloudQuery(tags_array);
  var request = new XMLHttpRequest();
  request.open("GET", url_api);
  request.onload = function(e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        // parse the url out of the song out of the soundcloud response
        var songURL = URLFromResponse(request.responseText);
        if (songURL) {
          // NEXT CALL HERE
          // ready to create articles
          createArticleDiv(songURL, articleData);
        } else {
          console.log("failed to load song url: " + songURL);
        }
      }
    }
  };
  request.send(null);
}

// create HTML element, set attributes and insert into page
function createArticleDiv(songURL, articleData) {
  var contentDiv = document.getElementsByClassName('content-main')[0];
  var newDiv = document.createElement('div');
  newDiv.className = "article";

  var contentLink = document.createElement('a');
  contentLink.href = articleData.webUrl;
  contentLink.target= "_blank";

  var title = document.createElement('h3');
  title.innerHTML = articleData.webTitle;
  title.className = "titles";

  var article_content = initArticleContent(articleData);

  var player = initPlayer(songURL);

  contentLink.appendChild(title);
  newDiv.appendChild(contentLink);
  newDiv.appendChild(article_content);
  newDiv.appendChild(player);
  contentDiv.appendChild(newDiv);
//templating instead
}

// create an iframe with songurl pointing to url given as input
function initPlayer(url) {
  var player = document.createElement('iframe');
  player.className = 'player';
  player.setAttribute('height', '166');
  player.setAttribute('scrolling', 'no');
  player.setAttribute('frameborder', 'no');
  player.setAttribute('src', url);
  return player;
}

// Create article div with content
function initArticleContent(data) {
  var article_content = document.createElement('p');
  var content = data.fields.body;
  if (content.length > 500) {
    article_content.innerHTML = content.substring(0, 500) + "...";
  } else {
    article_content.innerHTML = content;
  }
  article_content.className = "flavour";
  return article_content;
}

// change the css to make things slide on/off the screen
function splashClick() {
  var splashDiv = document.getElementById('splash');
  var wrapper = document.getElementsByClassName('wrapper')[0];
  var header = document.getElementsByClassName('header')[0];
  var body = document.getElementsByTagName('body')[0];

  splashDiv.style.bottom = '150vh';
  wrapper.style["margin-top"] = 0;
  wrapper.style["display"] = "block"
  header.style["top"] = 0;
  body.style["overflow-y"] = "auto";
}
