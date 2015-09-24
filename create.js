getArticles();

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
  var url = "http://content.guardianapis.com/search?section=music&api-key=test&show-fields=all&show-most-viewed=true";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        var data = JSON.parse(request.responseText)
        initCalls(data);
      }
    }
  };
  request.send(null);
}

function initCalls(data) {
  var articleObjs = data.response.results;

  // createArticle(articleObjs[0]);
  articleObjs.forEach(function(elem) {
    createArticle(elem);
  });
}

function createArticle(elem) {
  var url = elem.apiUrl;
  var request = new XMLHttpRequest();
  request.open("GET", url + "?show-tags=keyword&api-key=test");
  request.onload = function(e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        var data = JSON.parse(request.responseText)
        tags = data.response.content.tags.map(function(elem) {
          return elem.webTitle;
        }).filter(function(elem) {
          return !(elem === "Music" || elem === "Culture");
        });
        generateURL(tags, elem);
      }
    }
  };
  request.send(null);
  // var data = JSON.parse(request.responseText);
  // return data.response.content.tags.map(function(elem) {
  //   return elem.webTitle;
  // }).filter(function(elem) {
  //   return !(elem === "Music" || elem === "Culture");
  // });
}

// var urls = articleObjs.map(function(elem) {
// return {
//   "title" : elem.webTitle,
//   "tagsArray" : getTags(elem.apiUrl),
//   "link" : elem.webUrl,
//   "article" : elem.fields.body
// };
//
// }
//
// return urls;




function createArticleDiv(songURL, articleData) {
  var contentDiv = document.getElementsByClassName('content-main')[0];
  var newDiv = document.createElement('div');
  newDiv.className = "article";


  var contentLink = document.createElement('a');
  contentLink.href = articleData.webUrl;

  var title = document.createElement('h3');
  title.innerHTML = articleData.webTitle.toUpperCase();
  title.className = "titles";

  var article_content = document.createElement('p');
  var content = articleData.fields.body;
  if (content.length > 500) {
    article_content.innerHTML = content.substring(0, 500) + "...";
  } else {
    article_content.innerHTML = content;
  }
  article_content.className = "flavour";

  // var readMore = document.createElement('button');
  // readMore.innerHTML = "Read more...";
   contentLink.appendChild(title);

  var player = document.createElement('iframe');
  player.className = 'player';
  player.setAttribute('height', '166');
  player.setAttribute('scrolling', 'no');
  player.setAttribute('frameborder', 'no');
  // player.setAttribute(
  // height="166" scrolling="no" frameborder="no"
  player.setAttribute('src', songURL);
  // initPlayer(player, elem["tagsArray"]);
newDiv.appendChild(contentLink);
  // newDiv.appendChild(title);
  // contentLink.appendChild(title);

  newDiv.appendChild(article_content);

  // newDiv.appendChild(readMore);

  // contentLink.appendChild(readMore);
  newDiv.appendChild(player);
  contentDiv.appendChild(newDiv);

}
//
// window.onload = function() {
//   var i = 0;
//   var articleDate = getArticles();
//   var contentDiv = document.getElementsByClassName('content-main')[0];
//
//   articleDate.forEach( function(elem) {
//     if (i === 2) return ;
//     i++;
//     var newDiv = document.createElement('div');
//     newDiv.className = "article";
//
//     var contentLink = document.createElement('a');
//     contentLink.href = elem["link"];
//
//     var title = document.createElement('h3');
//     title.innerHTML = elem["title"];
//
//     var article_content = document.createElement('p');
//     if (elem.article.length>500){
//       article_content.innerHTML=elem.article.substring(0,500)+"...";
//     }
//     else{
//       article_content.innerHTML = elem.article;
//     }
//
//     var readMore=document.createElement('button');
//     readMore.innerHTML="Read more...";
//     contentLink.appendChild(readMore);
//
//     var player = document.createElement('iframe');
//     player.className = 'player';
//     player.setAttribute('height', '166');
//     player.setAttribute('scrolling', 'no');
//     player.setAttribute('frameborder', 'no');
//     // player.setAttribute(
//     // height="166" scrolling="no" frameborder="no"
//
//     initPlayer(player, elem["tagsArray"]);
//
//
//
//     newDiv.appendChild(title);
//     // contentLink.appendChild(title);
//
//     newDiv.appendChild(article_content);
//     newDiv.appendChild(contentLink);
//     // newDiv.appendChild(readMore);
//
//     // contentLink.appendChild(readMore);
//     contentDiv.appendChild(newDiv);
//     contentDiv.appendChild(player);
//   });
// }
