/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
  'ui.router',
  'ui.bootstrap',
  'ngMessages',
  'angularMoment',
  'App.auth',
  'App.socket',
  'App.profile',
  'App.personalChallenge',
  'App.newChallenge',
  'App.challengeView',
  'App.challengeDirective',
  'App.challengeService',
  'App.newsfeed',
  'App.authFactory',
  'App.userFactory',
  'App.challengeFactory',
  'App.braintreeFactory',
  'App.charityFactory',
  'App.alertService',
  'App.alertController',
  'angularSpinner',
  'App.loadingService',
  'App.loadingController',
  'App.s3Factory',
  'App.customFilter',
])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider
    .otherwise('/');

  $stateProvider
    .state('signin', {
      url: '/signin',
      // templateUrl: 'script/module/user/auth/signin.html',
      views: {
        'leftPane': { 
          templateUrl: 'partial/signinPane.html', 
        },
        'rightPane': { 
          templateUrl: 'script/module/user/auth/signin.html',
          controller: 'authCtrl',
          controllerAs: 'authCtrl',
        }
      },
      data: {
        authenticate: false
      }
    })
    .state('signup', {
      url: '/signup',
      // templateUrl: 'script/module/user/auth/signup.html',
      views: {
        'leftPane': { 
          templateUrl: 'partial/signinPane.html', 
        },
        'rightPane': { 
          templateUrl: 'script/module/user/auth/signup.html',
          controller: 'authCtrl',
          controllerAs: 'authCtrl', 
        }
      },
      data: {
        authenticate: false
      }
    })
    .state('profile', {
      url: '/profile',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/user/profile/profile.html',
          controller: 'profileCtrl',
          controllerAs: 'profileCtrl',
        },
        'rightPane': { 
          templateUrl: 'script/module/user/profile/billing.html',
          controller: 'profileCtrl',
          controllerAs: 'profileCtrl',
        }
      },
      data: {
        authenticate: true
      }
    })
    .state('charity', {
      url: '/charity',
      templateUrl: 'script/module/charity/charity.html',
      controller: 'charityCtrl',
      controllerAs: 'charityCtrl',
      data: {
        authenticate: true
      }
    })
    .state('challenges', {
      url: '/challenges',
      templateUrl: 'script/module/challenge/challenges.html',
      controller: 'challengeListCtrl',
      controllerAs: 'challengeLC',
      data: {
        authenticate: true
      }
    })

    .state('newChallenge', {
      url: '/challenge/create/friend',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/challenge/steps/friend.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',

        },
        'rightPane': { 
          templateUrl: 'partial/challengePane.html' 
        }
      },
      data: {
        authenticate: true
      }
    })
    .state('createChallengeDetail', {
      url: '/challenge/create/detail',
      views: {
        'leftPane': { 
          templateUrl: 'partial/friendDetail.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        },
        'rightPane': { 
          templateUrl: 'script/module/challenge/steps/detail.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        }
      },
      data: {
        authenticate: true
      }
    })
    .state('createChallengeCharity', {
      url: '/challenge/create/charity',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/challenge/steps/charity1.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        },
        'rightPane': { 
          templateUrl: 'script/module/challenge/steps/charity2.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        }
      },
      data: {
        authenticate: true
      }
    })
    .state('createChallengePayment', {
      url: '/challenge/create/payment',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/challenge/steps/final.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        },
        'rightPane': { 
          templateUrl: 'script/module/challenge/steps/payment.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        }
      },
      data: {
        authenticate: true
      }
    })



    .state('viewChallenge', {
      url: '/challenge/:id',
      // templateUrl: 'script/module/newsfeed/newsfeed.html',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/newsfeed/newsfeed.html',
          controller: 'newsfeedCtrl',
          controllerAs: 'newsfeedCtrl',
        },
        'rightPane': { 
          templateUrl: 'script/module/challenge/challenge-view.html',
          controller: 'challengeViewCtrl',
          controllerAs: 'challengeViewCtrl', 
        }
      },
      data: { authenticate: true }
    })

    .state('viewChallengePersonal', {
      url: '/challenge/detail/:id',
      // templateUrl: 'script/module/newsfeed/newsfeed.html',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/challenge/challenge-view.html',
          controller: 'challengeViewCtrl',
          controllerAs: 'challengeViewCtrl', 
        },
        'rightPane': { 
          templateUrl: 'script/module/user/challenge/challenge-personal.html',
          controller: 'personalChallengeCtrl',
          controllerAs: 'personalChallengeC',
        }
      },
      data: { authenticate: true }
    })

    .state('home', {
      url: '/',
      // templateUrl: 'script/module/newsfeed/newsfeed.html',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/newsfeed/newsfeed.html',
          controller: 'newsfeedCtrl',
          controllerAs: 'newsfeedCtrl',
        },
        'rightPane': { 
          templateUrl: 'script/module/user/challenge/challenge-personal.html',
          controller: 'personalChallengeCtrl',
          controllerAs: 'personalChallengeC',
        }
      },
      data: { authenticate: true }
    });

  $httpProvider.interceptors.push(function ($window) {
    return {
      request: function (config) {
        var jwt = $window.localStorage.getItem('com.challengr');
        var braintree = $window.localStorage.getItem('com.braintree');
        if (jwt) {
          config.headers['x-access-token'] = jwt;
        }
        if (braintree) {
          config.headers['x-braintree-token'] = braintree;
        }
        config.headers['Allow-Control-Allow-Origin'] = '*';
        return config;
      }
    };
  });
}])

.run(function ($rootScope, $state, authFactory, $window, socket) {
  // only configure socket when the user is already logged in otherwise the needed
  // data to identify him on the server does not exist
  if (authFactory.isAuth()) {
    socket.configureSocket();
  }
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    // Left Detail View
    if (toState.url === '/challenge/:id') {
      $rootScope.rightDetailView = true;
    } else {
      $rootScope.rightDetailView = false;
    }

    // Right Detail View
    if (toState.url === '/challenge/detail/:id' || toState.url === '/challenge/create/detail') {
      $rootScope.leftDetailView = true;
    } else {
      $rootScope.leftDetailView = false;
    }

    // Profile
    if (toState.url === '/profile') {
      $rootScope.topPadding = true;
    } else {
      $rootScope.topPadding = false;
    }


    // Signin and Signup
    if (toState.url === '/signin' || toState.url === '/signup') {
      $rootScope.signupOrLoginPage = true;
    }
    if (toState.url !== '/signup' && toState.url !== '/signin') {
      $rootScope.signupOrLoginPage = false;
    }

    if (toState.data.authenticate && !authFactory.isAuth()) {
      $state.go('signin');
      event.preventDefault();
    }
  });
});
