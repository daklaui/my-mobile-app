import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page";
import { Button } from "tns-core-modules/ui/button";

export const ICON_OPEN_MENU = String.fromCharCode(0xf141);
export const ICON_SEARCH = String.fromCharCode(0xf002);
export const ICON_HEART = String.fromCharCode(0xf004);
export const ICON_PROFILE = String.fromCharCode(0xf007);
export const ICON_COMMENT = String.fromCharCode(0xf075);
export const ICON_BELL = String.fromCharCode(0xf0f3);
export const BUTTON_ENABLED = 'fa icon-footer-active';
export const BUTTON_DISABLED = 'fa icon-footer';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    private _isOpenMenu: boolean = true;

    searchPhrase: string;

    public drawerTrigger: string = ICON_OPEN_MENU;
    public iconSearch: string = ICON_SEARCH;
    public iconNewspaper: string = ICON_HEART;
    public iconProfile: string = ICON_PROFILE;
    public iconComment: string = ICON_COMMENT;
    public iconBell: string = ICON_BELL;
    public currentStep: number = 1;

    constructor(private _page: Page) { 

    }

    ngOnInit(): void {
    }

    toggleDrawer(): void {
        this._isOpenMenu = !this._isOpenMenu;
        if (this._isOpenMenu) {
            this.onCloseDrawerTap();
        } else {
            this.openDrawer();
        }
    }

    public openDrawer() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onCloseDrawerTap() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    navigateToStep(step: number): void {
        this.currentStep = step;
        for (let i = 1; i <= 4; i++) {
            let otherButton = <Button>this._page.getViewById('itemNavigationButton' + i);
            otherButton.className = BUTTON_DISABLED;

        }
        let button = this._page.getViewById('itemNavigationButton' + step);
        button.className = BUTTON_ENABLED;
    }
}
