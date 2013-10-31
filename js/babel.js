    function Babel($scope) {
	$scope.translation = "";
	$scope.message = "";
	$scope.configuration = new Array();
	$scope.configuration['current_exercise'] =  '1';

	$scope.exercises = new Array(
	    {text:'Rhenus fluvius est.', translations:new Array('The Rhine is a river.', 'Rhine is a river.')},
	    {text:'Julia fillia est.', translations:new Array('Julia is a girl.', 'Julia is girl.')});

	$scope.checkTranslation = function() {
	    var currentExercise = $scope.configuration['current_exercise'] - 1;
	    var translations = $scope.exercises[currentExercise].translations
	    for (var i in translations)
	    {
		if(translations[i].toLowerCase() == $scope.translation.toLowerCase()){
		    $('#message').css("background-color", "green");
		    $('#message').html('Correct answer.');
		    $scope.nextLesson();
		    return "Ok";
		}
	    }
	    $('#message').css("background-color", "red");
	    $('#message').html('Wrong answer.');
	    $scope.nextLesson();
	    return "not OK";
	};

	$scope.nextLesson = function() {
	    if($scope.exercises.length > $scope.configuration['current_exercise']){
		$('#message').css("background-color", "white");
		$('#text').val('');
		$scope.configuration['current_exercise']++;
	    } else {
		$('#message').html('Session is over.');
	    }
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

