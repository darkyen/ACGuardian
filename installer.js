var windows = require('node-windows');
var Service = windows.Service;

var svc = new Service({
  name:'ACGuardian',
  description: 'Service to protect you from having critical shutdown on power failure',
  script: require('path').join(__dirname, 'index.js')
});

function initService(){
	svc.start();
}
svc.uninstall();
windows.isAdminUser(function(isAdmin){
	if( isAdmin ){
		svc.on('install', initService);
		svc.on('alreadyinstalled', initService);		
		svc.on('start', console.log.bind(console, 'Service Started Hurrah !'));
		svc.on('stop', console.log.bind(console, 'Service stoped boooah !'));
		svc.on('error', console.error.bind(console, 'OMFG ERRAH!'));
		svc.install();
	}
});
