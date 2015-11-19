angular.module('app.services', [])

.factory('sync', ['$q', '$rootScope', function($q, $rootScope) {
  var datasetId = "myShoppingList";
  function unwrapList(r) {
    var result = [];
    for(var i in r) {
      result.push(unwrap(r[i], i));
    }
    return result;    
  }
  
  function unwrap(value, id) {
      var obj = value.data;
      obj.id = id;
      obj.moment = moment(obj.created).fromNow();
      return obj;
  }
  
  return {
    init: function () {
      $fh.sync.init();
      var deferred = $q.defer();
      var success = function(r) {
        var result = unwrapList(r);
        $rootScope.$emit('sync', result);
        deferred.resolve(result);
      };
      var fail = function(error) {
        console.log("error " + error);
        console.log("error source " + error.source);
        console.log("error target " + error.target);
        deferred.reject(error);
      };
      
      $fh.sync.manage(datasetId);
      $fh.sync.notify(function(notification) {
        if( 'sync_complete' == notification.code ) {
          $fh.sync.doList(datasetId, success, fail);
        }
        else if( 'local_update_applied' === notification.code ) {
          $fh.sync.doList(datasetId, success, fail);
        }
        else if( 'remote_update_failed' === notification.code ) {
          var errorMsg = notification.message ? notification.message.msg ? notification.message.msg : undefined : undefined;
          fail(errorMsg);
        }    
      });
      
      return deferred.promise;
    },
    deleteItem: function(item) {
      var deferred = $q.defer();      
      $fh.sync.doDelete(datasetId, item.id, function(r) {
        deferred.resolve(r);
      }, function(code, msg) {
        console.log("error msg" + msg);
        console.log("error code " + code);
        deferred.reject(msg)
      });
      return deferred.promise;
    },
    deleteAll: function() {
      var deferred = $q.defer();
      var success = function(r) {
        deferred.resolve(r);
      };
      var fail = function(code, msg) {
        console.log("error msg" + msg);
        console.log("error code " + code);
        deferred.reject(msg)
      };
      $fh.sync.doList(datasetId, function(r) {
        for(var i in r) {
          $fh.sync.doDelete(datasetId, i, success, fail);
        }        
      }, fail);      
      return deferred.promise;
    },
    getItem: function(id) {
      var deferred = $q.defer();      
      $fh.sync.doRead(datasetId, id, function(r) {
          deferred.resolve(unwrap(r, id));
      }, function(code, msg) {
        console.log("error msg" + msg);
        console.log("error code " + code);
        deferred.reject(msg)
      });
      return deferred.promise;
    },
    update: function(item) {
      var deferred = $q.defer();      
      $fh.sync.doUpdate(datasetId, item.id, item, function(r) {
          deferred.resolve(r);
      }, function(code, msg) {
        console.log("error msg" + msg);
        console.log("error code " + code);
        deferred.reject(msg)
      });
      return deferred.promise;
    }, 
    save: function(item) {
      var deferred = $q.defer();      
      $fh.sync.doCreate(datasetId, item, function(r) {
          deferred.resolve(r);
      }, function(code, msg) {
        console.log("error msg" + msg);
        console.log("error code " + code);
        deferred.reject(msg)
      });
      return deferred.promise;
    } 
  };
}])


.service('BlankService', [function(){

}]);

