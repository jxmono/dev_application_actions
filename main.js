define([
    "/jquery.js",
    "/bootstrap/js/bootstrap.js"
    ], function() {
    var self;
    
    var FADE_TIME = 500;
    
    function init(config) {
        self = this;
        
        // Click on redeployMonoDev button
        $("#redeployMonoDev").on("click", function() {
            var redeployButton = $(this);
            redeployButton.button("loading");
            self.link("redeployMonoDev", function(err) {
                if (err) {
                    showError("Failed to redeploy MonoDev.");
                    return;
                }

                redeployButton.button("reset");
                console.log("Successfully repdeployed.");
            });
        });
        
        // Get the applications data
        self.link("applications", function(err, data) {
            if(err) return showError(err);
            buildTable(data);
        });
        
        var appId;
        
        // Click on an operation button
        $('#appsTable').on("click", ".btn", function() {

            var operation = $(this).attr("data-operation");
            
            appId = $(this).closest("[id]").attr("id");

            if(operation) {
                confirmAction(operation);
            }
        });

        // Click on Yes button of modal
        $("#yesButton").on("click", function() {
            var operationName = $("#operationName").text().toLowerCase();

            $("#"+appId).find(".spinner").show();
            $("#"+appId).find(".operations").hide();
            $("#modal").modal("hide");
                                        
            switch(operationName){
                case "delete":
                    self.link("delete", { data : appId }, function(err, data) {
                        if(err) return showError(err);
                        $("#" + appId).fadeOut(FADE_TIME);
                    });
                break;
                case "redeploy":
                    self.link("redeploy", { data: appId }, function(err, data) {
                        $("#"+appId).find(".operations").show();
                        $("#"+appId).find(".spinner").hide();
                        if(err) return showError(err);
                    });
                break;
                case "update":
                    self.link("update", { data: appId }, function(err, data) {
                        $("#"+appId).find(".operations").show();
                        $("#"+appId).find(".spinner").hide();
                        if(err) return showError(err);
                    });
                break;

            }
        });
    }
    
    // Build table with apps names
    function buildTable(apps) {   
        var template = $(".template");
        var tbody = $("#appsTable").find("tbody");
        for(var i in apps) {
            var app = apps[i];
            
            if(app.name !== "MonoDev") {
                var tr = template.clone().removeClass("template").show();
                tr.attr("id", app.id);
                tr.find('.name').find("a").html(app.name);
                tbody.append(tr);
            }
        }
    }
    
    // Show error
    function showError(err) {
        $("#errorAlert").html("Error: " + err).fadeIn();
    }
    
    // Confirm Modal
    function confirmAction(operation) {
        switch(operation){
            case "delete":
                $("#operationName").html("Delete");
                $("#question").html("Are you really <b>sure</b> that you want to delete this application?");
                $("#modal").modal('show');
            break;
            case "redeploy":
                $("#operationName").html("Redeploy");
                $("#question").html("Are you sure that you want to redeploy this application?");
                $("#modal").modal('show');
            break;
            case "update":
                $("#operationName").html("Update");
                $("#question").html("Are you sure that you want to update this application?");
                $("#modal").modal('show');
            break;
        }
    }
    
    return init;
});


