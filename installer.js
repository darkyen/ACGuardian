var windows = require('node-windows');
var Service = windows.Service;

var svc = new Service({
  name:'ACGuardian',
  script: require('path').join(__dirname, 'index.js')
});

function initService(){
	svc.start();
}

windows.isAdminUser(function(isAdmin){
	if( isAdmin ){
		svc.on('install', initService);
		svc.on('alreadyinstalled', initService);		
		svc.install();
	}
});
