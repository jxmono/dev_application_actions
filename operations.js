var spawn = require("child_process").spawn;

var send  = require(CONFIG.root + "/core/send.js").send;
var apps = require(CONFIG.root + "/api/apps");

// Redeploy app function
exports.redeploy = function(link) {

}

// Start app function
exports.start = function(link) {

}

// Stop app function
exports.stop = function(link) {

}

// Edit app function
exports.edit = function(link) {

}

// Delete app function
exports.delete = function(link) {

}

// Get apps names function
exports.applications = function(link) {
    apps.getApplications(function(apps){
        send.ok(link.res, apps);
    });
}
