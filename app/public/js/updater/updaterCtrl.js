app.controller('UpdaterCtrl', function ($scope, $http, $window) {
  var url = 'https://api.github.com/repos/Soundnode/soundnode-app/releases'
    , config = {
      headers: {
        'Accept': 'application/vnd.github.v3.raw+json'
      }
    };

  $scope.updateAvailable = false;

  $http({
    method: 'GET',
    url: url,
    config: config
  }).then(function successCallback(response) {
    var release = response[0];
    var isMasterRelease = release.target_commitish === 'master';

    if (isMasterRelease) {
      if ($window.settings.appVersion < release.tag_name) {
        $scope.updateAvailable = true;
      }
    }
  }, function errorCallback(error) {
    console.log('Error checking if is a new version available', error);
  });
});