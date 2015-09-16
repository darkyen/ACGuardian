var isOnline = require('is-online');
var winTools = require('wintools');
var windows  = require('node-windows');

var log     = new windows.EventLogger('Hiemdall');
var lastPass = Date.now();
var critDiff = 10 * 60 * 1000;
var flag = false;

function decideWhatToDoNext(err, online){
	if( err !== null ){
		log.error("Critical Error - Must shutdown to verify sanity, sorry !");
		winTools.poweroff();
	}

	if( online === false ){
		
		flag = true;
		var now = Date.now();
		var diff = now - lastPass; 
		
		if( diff > critDiff ){
			log.error("System will now gracefully shutdown.");
			winTools.poweroff();
			return;
		}

		log.warn("System is offline shutdown will occur in " + (critDiff - diff)/ 1000 + " seconds");
		return;
	}
	
	if( flag ){
		flag = false;
		log.warn("System is back online shutdown timeout removed");
	}

	lastPass = Date.now();
}

function checkOnlineOrScheduleShutdown(){
	isOnline(decideWhatToDoNext);
	setTimeout(checkOnlineOrScheduleShutdown, 10000);
}

log.info("ACGuardian is up, will protect you from dark elves");
checkOnlineOrScheduleShutdown();