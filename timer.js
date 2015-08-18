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
		
		vm.seconds = 100;
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
		vm.startCountdown = function()
		{	
						
			inteSec = $interval(function()
			{
				
				if(vm.secondsTimer > 0)
				{
				
						vm.secondsTimer--;
						if(vm.secondsTimer < 6)
							{
							vm.flashButton().done(vm.noflashButton());
							//setTimeout(vm.noflashButton, 200);	
							}
				}		
				
				
			}, 1000);
		};
		
		vm.flashButton = function(){
		var r = $.Deferred();
			vm.btnClass = "flash";
			setTimeout(function () {
    
    r.resolve();
  }, 400);

			return r;
			//vm.btnClass = "";
		};
		vm.noflashButton = function(){
			vm.btnClass = "boo";
			//vm.btnClass = "";
		};
		

	}
	
})();
