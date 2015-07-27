var app = angular.module('app', ['ui.router']);


app.controller('AppController', function ($rootScope, $interval) {
    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('$stateChangeSuccess', arguments)
    });
    $rootScope.$on('$stateChangeStart', function () {
        console.log('$stateChangeStart', arguments)
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/1/ideas');
    $stateProvider
        .state('app', {
            url: '/app/{id}/',
            abstract: true,
            views: {
                '@': {
                    templateUrl: 'templates/root.partial.html',
                },
                'header@app': {
                    templateUrl: 'templates/header.partial.html',
                },
                'sidebar@app': {
                    templateUrl: 'templates/sidebar.partial.html'
                }
            }
        }).state('app.ideas', {
            url: 'ideas',
            abstract: true,
            views: {
                'content@app': {
                    template: '<div><a ui-sref="app.ideas.idea.tests">go tests</a></div>',
                    controller: function () {
                        console.log('app.ideas', 'controller');
                    }
                }
            }
        })
        .state('app.ideas.idea', {
            url: '?idea'
        })
        .state('app.ideas.idea.tests', {
            url: '/tests',
            // abstract: true,
            views: {
                'content@app': {
                    template: '<div>app.ideas.tests</div>',
                    controller: function () {
                        console.log('app.ideas.tests', 'controller');
                    }
                }
            }
        })
        .state('app.models', {
            url: 'models',
            abstract: true,
            views: {
                'content@app': {
                    template: '<div>app.models</div><a ui-sref="app.objectives({idea:$stateParams.idea})">go to objectives</a>',
                    controller: function ($stateParams, $scope, $timeout, $state) {
                        $timeout(function () {
                            console.log('app.models', 'controller', $stateParams, $state);
                            $scope.$stateParams = $state.params;
                        })

                    }
                }
            }
        })
        .state('app.models.idea', {
            url: '?idea',
            views: {
                'sub@app': {
                    template: '<div>app.models</div><a ui-sref="app.objectives({idea:$stateParams.idea})">go to objectives</a>',
                    controller: function ($stateParams, $scope, $timeout) {
                        console.log('app.models', 'sub', $stateParams);
                        $scope.$stateParams = $stateParams;
                    }
                }
            }
        })
        .state('app.models.tests', {
            url: '/tests?idea',
            views: {
                'content@app': {
                    template: '<div>app.models.tests</div>',
                    controller: function () {
                        console.log('app.models.tests', 'controller');
                    }
                }
            }
        })
        .state('app.objectives', {
            url: 'objectives?idea',
            views: {
                'content@app': {
                    template: '<div>app.objectives</div>',
                    controller: function () {
                        console.log('app.objectives', 'controller');
                    }
                }
            }
        })
})
