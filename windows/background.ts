import { windowNames } from "./../consts";
import { OWGames } from './../odk-ts/ow-games';
import { OWGameListener } from './../odk-ts/ow-game-listener';
import { OWWindow } from './../odk-ts/ow-window';
import RunningGameInfo = overwolf.games.RunningGameInfo;

// Background Controller as Singleton
class BackgroundController {
    private static _instance: BackgroundController;
    private _windows = {};
    private _warframeGameListener: OWGameListener;

    private constructor() {
        // Populating the background controller's window dictionary
        this._windows[windowNames.index] = new OWWindow(windowNames.index);
        this._windows[windowNames.in_game] = new OWWindow(windowNames.in_game);
    };

    // Implementing the Singleton design pattern
    public static instance(): BackgroundController {
        if (!BackgroundController._instance) {
            BackgroundController._instance = new BackgroundController();
        }

        return BackgroundController._instance;
    }

    // When running the app, start listening to games' status and decide which window should
    // be launched first, based on whether Warframe is currently running
    public async run() {
        this._warframeGameListener.start();
        const currWindow = await this.isWarframeRunning() ? windowNames.in_game : windowNames.index;
        this._windows[currWindow].restore();
    }

    private toggleWindows(info) {
        if (!info || !this.isGameWarframe(info)) {
            return;
        }

        if (info.isRunning) {
            this._windows[windowNames.index].close();
            this._windows[windowNames.in_game].restore();
        } else {
            this._windows[windowNames.in_game].close();
            this._windows[windowNames.index].restore();
        }
    }

    private async isWarframeRunning(): Promise<boolean> {
        const info = await OWGames.getRunningGameInfo();

        return info && info.isRunning && this.isGameWarframe(info);
    }

    // Identify whether the RunningGameInfo object we have references Fortnite
    private isGameWarframe(info: RunningGameInfo) {
        return info.classId === 8954;
    }
}

BackgroundController.instance().run();
overwolf.games.events.getInfo(function (info) {
    console.log(info);
});