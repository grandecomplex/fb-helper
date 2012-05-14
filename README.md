
FB-Helper
=========

### Facebook Facade to make your life a little bit easier.

#### To initialize
```
 var facebook = new window.Facebook(appId, channelUrl); // ("23423524235", "//url.com")
```

#### To login
```
facebook.login(function(response) {});
```

#### To Get User
```
facebook.getUser(function(response) {});
```

#### To find out if you are logged in already
```
facebook.isConnected(function(response) {});
```

#### To get a large profile pic
```
facebook.getProfilePic(function(response) {});

```

#### To post to the wall
```
facebook.postToWall({
    caption: "Awesome Post",
    message: "This is my message",
    link: "http://url.com"
  }, 
  function(response) {}
);
```