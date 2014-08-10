/*
  This file is part of Babel.

  Babel is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Babel is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Babel.  If not, see <http://www.gnu.org/licenses/>.
*/

function Babel($scope) {
    $scope.translation = "";
    $scope.message = "";
    $scope.configuration = new Array();
    $scope.configuration['current_exercise'] =  '1';

    $scope.exercises = new Array(
	{text:'Rhenus fluvius est.', translations:new Array('The Rhine is a river.', 'Rhine is a river.')},
	{text:'Julia fillia est.', translations:new Array('Julia is a girl.', 'Julia is girl.')},
	{text:'Julius vir est.', translations:new Array('Julius is a man.', 'Julius is man.')}
    );
    
    var length = $scope.exercises.length;
    $( "#progressbar" ).progressbar({
	max: length,
	value: 0
    });

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
	$('#text').val('');
	if($scope.exercises.length > $scope.configuration['current_exercise']){
	    $('#message').css("background-color", "white");
	    $scope.configuration['current_exercise']++;
	    $( "#progressbar" ).progressbar({
		value: $scope.configuration['current_exercise']-1
	    });
	} else {
	    $('#message').html('Session is over.');
	    $( "#progressbar" ).progressbar({
		value: $scope.configuration['current_exercise']
	    });
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

