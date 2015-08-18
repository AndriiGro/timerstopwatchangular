(function(){
	'use strict';
	
	var app = angular
		.module('timerApp', [])
		.controller('TimerController', ['$interval', TimerController]);
		
	app.filter('numberFixedLen', function () {
		return function(a,b){
			return(1e4+a+"").slice(-b)
		}
	});
		
	
	function TimerController($interval){
		var vm = this;
		
		vm.seconds = 0;
		vm.minutes = 0;
		vm.microseconds = 0;
		vm.secondsTimer = 0;
		vm.btnClass = "";
		
		var stop;
		var inteSec;
		
		vm.startTimer = function(){
			if ( angular.isDefined(stop) ) return;
			
			stop = $interval(function() {
				vm.microseconds = vm.microseconds + 1;
				if (vm.microseconds / 100 >= 1){
					vm.microseconds = vm.microseconds - 100;
					vm.seconds = vm.seconds + 1;
					if (vm.seconds / 60 >= 1){
						vm.seconds = vm.seconds - 60;
						vm.minutes = vm.minutes + 1;
					}		
				}
          }, 10);
		};
		
		vm.stopTimer = function(){
			if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
		};
		
		vm.resetTimer = function(){
			vm.stopTimer();
			vm.seconds = 0;
			vm.minutes = 0;
			vm.microseconds = 0;
		};
		
		var temp = true; 
		vm.startCountdown = function(){
			
						
			inteSec = $interval(function(){
				
				if(vm.secondsTimer == 0)
				{
					vm.noflashButton();
					return;}
					
				if(vm.secondsTimer > 5)
				{
					if(temp == true)
					{
						vm.secondsTimer--;
						temp = false;
					}
					else{
						temp = true;
					}
				}
				
				if(vm.secondsTimer <=5 && temp == true)
				{
					vm.secondsTimer--;
					vm.flashButton();
					temp = false;
					return;
				}
				if(vm.secondsTimer <=5 && temp == false)
				{
					vm.noflashButton();
					temp = true;
				}
				
				}, 500);
		};
		
		vm.flashButton = function(){
			vm.btnClass = "flash";
			//vm.btnClass = "";
		};
		vm.noflashButton = function(){
			vm.btnClass = "boo";
			//vm.btnClass = "";
		};
		

	}
	
})();
