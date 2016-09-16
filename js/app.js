angular.module('GiphyApp', ['infinite-scroll'])
.controller('GiphyCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.giphSearch = '';
  $scope.giphs = [];

  $scope.$watch('giphCount', function(newVal, oldVal) {
    $scope.getGiph();
  });

  $scope.getGiph = function() {
    var req = {
      url: 'http://api.giphy.com/v1/gifs/search?',
      method: 'GET',
      params: {
        q: $scope.giphSearch,
        api_key: 'dc6zaTOxFJmzC',
      }
    }

    $http(req).then(function success(res) {
      $scope.giphs = res.data.data;
    }, function error(res){
      console.log(res);
    });
  }

  $scope.loadMore = function() {
    var last = $scope.giphs[$scope.giphs.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.giphs.push(last + i);
    }
  };
}])
.run(function() {
  console.log('App has loaded!');
});
