window.onload = function() {
  createContent();
  // Find content + links from apis then dynamically create content!
  // execution starts here

  // main
  function createContent() {
    var url, request, data;

    if (dH.findById('splash'))
      dH.findById('splash').addEventListener('click', splashClick);
    url = "http://content.guardianapis.com/search?" +
      "section=music&show-tags=keyword&api-key=test&" +
      "show-fields=all&show-most-viewed=true";
    request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          data = JSON.parse(dH.getInnerData(["responseText"], request));
          initTagCalls(data);
        }
      }
    };
    request.send(null);
  }

  // ask the guardian for tag info for each article
  function initTagCalls(data) {
    var tagsArray;
    var articleObjs = dH.getInnerData(["response", "results"], data);
    articleObjs.forEach(function(elem) {
      tagsArray = elem.tags.map(function(tagElem) {
        return tagElem.webTitle;
      });
      generateSongURL(tagsArray, elem);
    });
  }


  // use tags to find song on soundcloud, keep data about articles so we can
  // push all content to page later
  function generateSongURL(tags_array, articleData) {
    var songURL;
    // create the query
    var url_api = createSoundcloudQuery(tags_array);
    var request = new XMLHttpRequest();
    request.open("GET", url_api);
    request.onload = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          songURL = URLFromResponse(request.responseText);
          if (songURL) {
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
    var contentDiv, newDiv, contentLink, title, article_content, player;

    contentDiv = dH.findByClass('content-main')[0];
    newDiv = document.createElement('div');
    newDiv.className = "article";

    contentLink = document.createElement('a');
    contentLink.href = articleData.webUrl;
    contentLink.target= "_blank";

    title = document.createElement('h3');
    title.innerHTML = articleData.webTitle;
    title.className = "titles";

    article_content = initArticleContent(articleData);

    player = initPlayer(songURL);

    contentLink.appendChild(title);
    newDiv.appendChild(contentLink);
    newDiv.appendChild(article_content);
    newDiv.appendChild(player);
    if (contentDiv) contentDiv.appendChild(newDiv);

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
    var splashDiv = dH.findById('splash');
    var wrapper = dH.findByClass('wrapper')[0];
    var header = dH.findByClass('header')[0];
    var body = dH.findByTag('body')[0];

    splashDiv.style.bottom = '150vh';
    wrapper.style["margin-top"] = 0;
    wrapper.style["display"] = "block"
    header.style["top"] = 0;
    body.style["overflow-y"] = "auto";
  }
};

var dH = (function() {
  var classes = {};
  var ids = {};
  var tags = {};

  var findByClass = function(className, elem) {
    if (elem)
      return Array.prototype.slice.call(elem.getElementsByClassName(className));
    if (!classes[className]) {
      classes[className] =
        Array.prototype.slice.call(document.getElementsByClassName(className));
    }
    return classes[className];
  };

  var findById = function(className, elem) {
    if (elem)
      elem.getElementById(className);
    if (!ids[className]) ids[className] = document.getElementById(className);
    return ids[className];
  };

  var findByTag = function(tagName, elem) {
    if (elem)
      return Array.prototype.slice.call(elem.getElementsByTagName(tagNane));
    if (!tags[tagName]) {
      tags[tagName] =
        Array.prototype.slice.call(document.getElementsByTagName(tagName));
    }
    return tags[tagName];
  };

  var getInnerData = function(accessors, elem) {
    var out = (elem) ? elem : document;
    accessors.forEach(function(accessor) {
      if (out[accessor]) out = out[accessor];
      else return ;
    });
    return out;
  };

  return {
    findById : findById,
    findByTag : findByTag,
    findByClass : findByClass,
    getInnerData: getInnerData
  };
}());
