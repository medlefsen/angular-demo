var app = angular.module('ticTacToe',[]);

app.directive('tictactoe',function(){
  return {
    restrict: 'E',
    scope: {
      size: '@',
      state: '=?',
      winner: '=?',
      next: '=?'
    },
    templateUrl: 'tictactoe.html',
    controller: ['$scope',function($scope) {
      $scope.reset = function() {
        $scope.state = [];
      };
      $scope.reset();

      var getNext = function(state) {
        var xs=0, os=0;
        for(var i = 0; i < state.length; ++i) {
          if(state[i] === 'x') ++xs;
          if(state[i] === 'o') ++os;
        }
        return os < xs ? 'o' : 'x';
      };

      var checkWinner = function(state) {
        for(var i = 0; i < 3; ++i) {
          if(state[i] && state[i] === state[i+3] && state[i] === state[i+6]) return state[i];
        }
        for(i = 0; i < 9; i+=3) {
          if(state[i] && state[i] === state[i+1] && state[i] === state[i+2]) return state[i];
        }
        if(state[0] && state[0] === state[4] && state[0] === state[8]) return state[0];
        if(state[2] && state[2] === state[4] && state[2] === state[6]) return state[2];
        return false;
      }

      $scope.$watch('state',function(state) {
        $scope.winner = checkWinner(state);
        if($scope.winner) {
          $scope.next = false;
        } else {
          $scope.next = getNext(state);
        }
      },true);
    }],
  };
});

app.directive('board',function() {
  return {
    restrict: 'E',
    scope: {
      size: '@',
      next: '@',
      state: '=',
    },
    templateUrl: 'board.html',
  };
});

app.directive('space',function() {
  return {
    restrict: 'E',
    scope: {
      size: '@',
      next: '@',
      state: '=',
    },
    templateUrl: 'space.html',
    controller: ['$scope', function($scope){
      $scope.changeState = function() {
        $scope.state = $scope.next;
      }
    }]
  };
});

app.directive('x',function(){
  return {
    restrict: 'E',
    scope: {
      size: '@',
      color: '@',
    },
    templateUrl: 'x.html'
  };
});

app.directive('o',function(){
  return {
    restrict: 'E',
    scope: {
      size: '@',
      color: '@',
    },
    templateUrl: 'o.html'
  };
});
