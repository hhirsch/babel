    function Babel($scope) {
	$scope.translation = "";
	$scope.configuration = new Array();
	$scope.configuration['current_exercise'] =  '1';

	$scope.exercises = new Array(
	    {text:'Rhenus fluvius est.', translations:new Array('The Rhine is a river.', 'Rhine is a river.')},
	    {text:'Julia fillia est', translations:new Array('Julia is a girl.', 'Julia is girl.')});

	$scope.checkTranslation = function() {
	    var currentExercise = $scope.configuration['current_exercise'] - 1;
	    var translations = $scope.exercises[currentExercise].translations
	    for (var i in translations)
	    {
		if(translations[i].toLowerCase() == $scope.translation.toLowerCase()){
		    $('#babel_window').css("background-color", "green");
		    return "Ok";
		}
	    }
	    $('#babel_window').css("background-color", "red");
	    return "not OK";
	};

	$scope.testTranslation = function() {
	    var currentExercise = $scope.configuration['current_exercise'] - 1;
	    var translations = $scope.exercises[currentExercise].translations
	    for (var i in translations)
	    {
		if(translations[i].toLowerCase() == $scope.translation.toLowerCase()){
		    return "Ok";
		}
	    }
	    return "not OK";
	};


	$scope.check = function() {
	    $scope.todos.push({text:$scope.todoText, done:false});
	    $scope.todoText = '';
	};
	

	$scope.addTodo = function() {
	    $scope.todos.push({text:$scope.todoText, done:false});
	    $scope.todoText = '';
	};
	
	$scope.remaining = function() {
	    var count = 0;
	    angular.forEach($scope.exercises, function(exercise) {
		count += exercise.done ? 0 : 1;
	    });
	    return count;
	};
	
	$scope.currentLesson = function() {
	    var count = $scope.configuration['current_exercise'] - 1;
	    return count;
	};

	
	$scope.archive = function() {
	    var oldTodos = $scope.todos;
	    $scope.todos = [];
	    angular.forEach(oldTodos, function(todo) {
		if (!todo.done) $scope.todos.push(todo);
	    });
	};
    }


$(document).ready(function() {
    var lessons = new Array('data/lessons/lesson1.json', 'data/lessons/lesson2.json');


    var options = {};
    
    $("#babel_window").center();
    $("#babel_window").fadeIn();
    

    $( document ).tooltip({
	position: {
	    my: "center bottom-20",
	    at: "center top",
	    using: function( position, feedback ) {
		$( this ).css( position );
		$( "<div>" )
		    .addClass( "arrow" )
		    .addClass( feedback.vertical )
		    .addClass( feedback.horizontal )
		    .appendTo( this );
	    }
	}
    });
});

