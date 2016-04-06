String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
$.fn.CountDown = function(options) {

 	var settings = $.extend({
        onComplete : function() {},

        // These are the defaults.
        endTime: '2016-04-02 05:56:00',
        format:'wdhms',
        tick:1000,

    }, options );

	var W = 0; // Months
	var D = 0; // Days
	var H = 0; // Hours
	var M = 0; // Minutes
	var S = 0; // Seconds
	var format;
	var timer
    return this.each(function() {

    	var d1 = new Date(settings.endTime);
    	var currentDate = new Date();
    	calculate_time(d1,currentDate);
    	var obj = this;
    	var output = '';
    	output = settings.format;
					
		output = output.replace('{w}',W.toString().lpad("0", 2));
		output = output.replace('{d}',D.toString().lpad("0", 2));
		output = output.replace('{h}',H.toString().lpad("0", 2));
		output = output.replace('{m}',M.toString().lpad("0", 2));
		output = output.replace('{s}',S.toString().lpad("0", 2));
		
		$(obj).html(output);
		
		if((d1 - currentDate)>0){

			timer = setInterval(function(){
						var currentDate = new Date();

						calculate_time(d1,currentDate);

						output = settings.format;

						output = output.replace('{w}',W.toString().lpad("0", 2));
						output = output.replace('{d}',D.toString().lpad("0", 2));
						output = output.replace('{h}',H.toString().lpad("0", 2));
						output = output.replace('{m}',M.toString().lpad("0", 2));
						output = output.replace('{s}',S.toString().lpad("0", 2));

						$(obj).html(output);

	    	 },settings.tick);
		}

    });

    
 	
 	function calculate_time(date_future,date_now){
 		if((date_future - date_now)>0){
	 		// get total seconds between the times
			var delta = Math.abs(date_future - date_now) / 1000;
			// calculate (and subtract) whole hours
			if(settings.format.indexOf('{w}') > -1){
				W = Math.floor(delta / 604800);
				delta -= W * 604800;
			}

			if(settings.format.indexOf('{d}') > -1){
				D = Math.floor(delta / 86400);
				delta -= D * 86400;
			}

			if(settings.format.indexOf('{h}') > -1){
				H = Math.floor(delta / 3600) % 24;
				delta -= H * 3600;
			}
			if(settings.format.indexOf('{m}') > -1){
				M = Math.floor(delta / 60) % 60;
				delta -= M * 60;
			}

			if(settings.format.indexOf('{s}') > -1){
				// what's left is seconds
				if(delta<0.1){
					S = 0;
				}else{
					S = Math.ceil(delta % 60);  // in theory the modulus is not required	
				}
			}
		}else{
			clearInterval(timer)
			W = 0; // Months
			D = 0; // Days
			H = 0; // Hours
			M = 0; // Minutes
			S = 0; // Seconds

			output = settings.format;

			output = output.replace('{w}',W.toString().lpad("0", 2));
			output = output.replace('{d}',D.toString().lpad("0", 2));
			output = output.replace('{h}',H.toString().lpad("0", 2));
			output = output.replace('{m}',M.toString().lpad("0", 2));
			output = output.replace('{s}',S.toString().lpad("0", 2));

			$(this).html(output);
			settings.onComplete.call();
		}
		

 	}

};