/*

FB Helper - an easier way to interact with FB Graph API
Author - Alex Grande

*/

(function(window, document, console) {
  var FB;
  var Facebook = window.Facebook = function(appId, channelUrl, callback) {

      window.fbAsyncInit = function() {
        FB = window.FB;
        FB.init({
          appId: appId, // App ID
          channelUrl: channelUrl, // Channel File
          status: true, // check login status
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: true,  // parse XFBML
          oauth: true
        });
        FB.Event.subscribe('auth.authResponseChange', function(response) {
          document.body.className = response.authResponse ? 'connected' : 'not_connected';
           if (response.authResponse) {
             console.log(response);
           }
        });
        callback();
      };

      // Load the SDK Asynchronously
      (function(d){
         var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "http://connect.facebook.net/en_US/all.js";
         d.getElementsByTagName('head')[0].appendChild(js);
       }(document));
  };
  
  Facebook.prototype.login = function(callback) {
    var that = this;
    FB.login(function(response) {

      var outerResponse = response;
      if (response.authResponse) {
        that.getUser(function(user) {
          user.autResponse = outerResponse.authResponse;
          callback(user);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'email, publish_stream'});
  };
  
  Facebook.prototype.getUser = function(callback) {
    FB.api('/me', function(response) {
        response.authResponse = {};
        response.authResponse.accessToken = FB.getAccessToken();
        
        callback(response);
    });
  };
  
  Facebook.prototype.isConnected = function(callback) {
      FB.getLoginStatus(callback);
  };
  
  Facebook.prototype.getProfilePic = function(callback) {
      //Get a list of all the albums
      FB.api('/me/picture?type=large', function (response) {
          callback(response);
      });
  };
  
  Facebook.prototype.postToWall = function(data, callback) {
    data.caption = data.caption || "";
    data.message = data.message || "";
    data.link = data.link || "";
    FB.api('/me/feed', 'post', data, callback);
  };
})(window, document, console);