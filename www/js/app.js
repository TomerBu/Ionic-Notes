// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
    var app = angular.module('starter', ['ionic'])

    app.config(function($stateProvider, $urlRouterProvider){
      $stateProvider.state('list', {
         url:'/list',
         templateUrl:'templates/list.html'
       }
      );

      $stateProvider.state('edit', {
         /*/:Parameter Name*/
         url:'/edit/:noteId',
         templateUrl:'templates/edit.html',
         controller:'edit-controller'
       }
      );

      $stateProvider.state('add', {
         /*/:Parameter Name*/
         url:'/add',
         templateUrl:'templates/edit.html',
         controller:'add-controller'
       }
      );


      $urlRouterProvider.otherwise('/list');
    });

    //First We configure the App, And than have the logic to control it.
    var notes = [
          {id:'1', title:'First Note', description:'The Data'},
          {id:'2', title:'2nd Note', description:'The Data'},
          {id:'3', title:'3rd Note', description:'The Data'},
        ];

    //we need this function so we can delete notes and use non-sequential ids.
    function findNoteById(noteId){
      for (var i = 0; i < notes.length; i++) {
        if(notes[i].id === noteId)
          return notes[i];
      }
      return undefined;
    }


    //we need this function so we can delete notes and use non-sequential ids.
    function updateNote(note){
      for (var i = 0; i < notes.length; i++) {
        if(notes[i].id === note.id){
           notes[i] = note;
           return;
        }
      }
    }


    app.controller('notes-controller', function($scope){
        $scope.notes = notes;
    });

    //First We configure the App, And than have the logic to control it.
    app.controller('edit-controller', function($scope, $state){
        $scope.noteId = $state.params.noteId;
        $scope.note = angular.copy(findNoteById($scope.noteId));


        $scope.save = function(){
          updateNote($scope.note);
          $state.go('list');
        }
    });

    app.controller('add-controller', function($scope, $state){
       $scope.note = {
        id: new Date().getTime().toString(),
        title:'',
        description:''
       }

       $scope.save = function(){
         notes.push($scope.note);
         $state.go('list');
       }
    })

    app.run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })


})();