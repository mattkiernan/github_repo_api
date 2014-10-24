$(function(){
  $("body").submit("form.username", extractUsername);
});

var getGithubInfo = function(url) {
  var clientId = "d1aad176fc8a61dd4bb6";
  var clientSecret = "47362c7bd8819dc633a012553e69019227b0084b";
  var authDetails = "?client_id=" + clientId + "&client_secret=" + clientSecret;
  return $.get(url + authDetails);
};

var extractUsername = function(){
  var username = $("input.username").val();
  var userRequest = getGithubInfo("https://api.github.com/users/" + username);

  var whenFinished = function(userData){
    loadImage(userData.avatar_url);
    loadName(userData.name, userData.html_url);
    loadLocation(userData.location);
    var conversation = getReposInfo(userData.repos_url)
    conversation.done(displayRepos);
  };

  userRequest.done(whenFinished);

  var loadImage = function(avatar_url){
    $("img").attr("src", avatar_url);
  };

  var loadName = function(name, htmlUrl){
    $("a.name").text(name);
    $("a.name").attr("href", htmlUrl);
  };

  var loadLocation = function(location){
    $("p.location").text(location);
  };

  var getReposInfo = function(reposUrl){
    return $.get(reposUrl);
  };

  var displayRepos = function(repoData){
    $("li").remove();
    for(i=0;i<repoData.length;i++){
      if(repoData[i].fork){
        $("ul").append("<li class='fork'><a href="+repoData[i].html_url+">"+repoData[i].name+"</a></li>");
      }else{
        $("ul").append("<li><a href="+repoData[i].html_url+">"+repoData[i].name+"</a></li>");
      };
    };
  };
  
  return false;
};
