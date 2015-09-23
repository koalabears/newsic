window.onload = function() new Promise(function(resolve, reject) { //initialise soundcloud - when user clicks on link, it calls the function
  SC.initialize({
    client_id: "a2b378fe2c15350323249b3ab162e4bf"

    // redirect_uri: "https://soundcloud.com/user-360572689",
  });
  SC.get('/tracks', {limit: 1}, function(tracks) { //callback function that calls matches
    var random = Math.floor(Math.random() * 49); //default number of tracks returned = 50
    SC.oEmbed(tracks[random].uri, { auto_play: true }, document.getElementById('target'));
  });
});


// // SC.connect(function(){
// //   SC.put("/me/followings/3207", function(user, error){
// //     if(error){
// //       alert("Error: " + error.message);
// //     }else{
// //       alert("You are now following " + user.username);
// //     }
// //   });
// // });
//
// function scPlayer(genre) {
//   SC.get('/tracks', {
//     genres: genre,
//     bpm: {
//       from: 100
//     }
//   }, function(tracks) { //callback function that calls matches
//     var random = Math.floor(Math.random() * 49); //default number of tracks returned = 50
//     SC.oEmbed(tracks[random].uri, { auto_play: true }, document.getElementById('target'));
//   });
// }
//
// window.onload = function() new Promise(function(resolve, reject) { //initialise soundcloud - when user clicks on link, it calls the function
//   SC.initialize({
//     client_id: "a2b378fe2c15350323249b3ab162e4bf"
//     // redirect_uri: "https://soundcloud.com/user-360572689",
//   });
// });
//
// var menuLinks = document.getElementsByClassName('genre');
// for (var i=0; i<menuLinks.length; i++) {
//   var menuLink = menuLinks[i];
//   menuLink.onclick = function(e) {
//     e.preventDefault();
//     scPlayer(menuLink.innerHTML);
//   };
// }
