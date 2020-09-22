// this a subset of the features that Warframe events provides - however,
// when writing an app that consumes events - it is best if you request
// only those features that you want to handle.
//
// NOTE: in the future we'll have a wildcard option to allow retreiving all
// features
var g_interestedInFeatures = [
    'game_info',
    'match_info',
    'gep_internal'
];

var game_info;

function registerEvents() {
    // general events errors
    overwolf.games.events.onError.addListener(function(info) {
        console.log("Error: " + JSON.stringify(info));
    });

    // "static" data changed
    // This will also be triggered the first time we register
    // for events and will contain all the current information
    overwolf.games.events.onInfoUpdates2.addListener(function(info) {
        console.log("Info UPDATE: " + JSON.stringify(info));
    });

    // an event triggerd
    overwolf.games.events.onNewEvents.addListener(function(info) {
        console.log("EVENT FIRED: " + JSON.stringify(info));
    });
}

function gameLaunched(gameInfoResult) {
    if (!gameInfoResult) {
        return false;
    }

    if (!gameInfoResult.gameInfo) {
        return false;
    }

    if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
        return false;
    }

    if (!gameInfoResult.gameInfo.isRunning) {
        return false;
    }

    // NOTE: we divide by 10 to get the game class id without it's sequence number
    if (Math.floor(gameInfoResult.gameInfo.id / 10) != 8954) {
        return false;
    }

    console.log("Warframe Launched");
    return true;

}

function gameRunning(gameInfo) {

    if (!gameInfo) {
        return false;
    }

    if (!gameInfo.isRunning) {
        return false;
    }

    // NOTE: we divide by 10 to get the game class id without it's sequence number
    if (Math.floor(gameInfo.id / 10) != 8954) {
        return false;
    }

    console.log("Warframe running");
    return true;

}


function setFeatures() {
    overwolf.games.events.setRequiredFeatures(g_interestedInFeatures, function(info) {
        if (info.status == "error") {
            //console.log("Could not set required features: " + info.reason);
            //console.log("Trying in 2 seconds");
            window.setTimeout(setFeatures, 2000);
            return;
        }

        console.log("Set required features:");
        console.log(JSON.stringify(info));
    });
}


// Start here
registerEvents();
overwolf.games.onGameInfoUpdated.addListener(function(res) {
    if (gameLaunched(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
    }
    game_info = res;
    console.log("onGameInfoUpdated: " + JSON.stringify(res));
});

overwolf.games.getRunningGameInfo(function(res) {
    if (gameRunning(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
    }
    game_info = res;
    console.log("getRunningGameInfo: " + JSON.stringify(res));
});

function createIngameWindow()
{
    overwolf.windows.obtainDeclaredWindow('in_game', function (declared) {
        overwolf.windows.restore('in_game', function (in_game_window) {
            var id = declared.window.id;
            // Restores the current window, resize now
            overwolf.windows.changeSize(id, game_info.width, game_info.height, function(res) {
                // Resized
                if(game_info.width != "undefined")
                    console.log("Resized to: " + game_info.width + "x" + game_info.height  + " (id: " + id + ")");
            });
        });
    });
}