(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, {
      coffeeorder: val.coffee,
      email: val.emailAddress,
      size: val.size,
      flavor: val.flavor,
      caffeinerating: val.strength
    }, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key) {
    var Url = this.serverUrl + "?email=" + key;
    $.ajax({
      url: Url,
      type: "get",
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    var result = null;
    var deleteURL = this.serverUrl;
    var Url = this.serverUrl + "?email=" + key;
    $.ajax({
      url: Url,
      type: "get",
      success: function(data) {
        result = data;
        deleteURL += "/" + result[0].id;
        $.ajax({
          url: deleteURL,
          type: "delete",
        });
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
