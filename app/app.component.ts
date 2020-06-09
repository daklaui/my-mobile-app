import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { DrawerStateChangingEventArgs } from 'nativescript-ui-sidedrawer';
export const ICON_SETTINGS: string = String.fromCharCode(0xf013);
export const ICON_LOGOUT: string = String.fromCharCode(0xf08b);

class ItemMenu {
    constructor(public icon: string,
        public text: string) { }
}
@Component({
  selector: 'app-root',
  template: `<RadSideDrawer (drawerClosed)="drawerClosed($event)">
  <GridLayout tkDrawerContent class="side-drawer" rows="*" columns="*">
      <ListView verticalAlignment="bottom" class="menu" [items]="menu"
          (itemTap)="onItemTap($event)">
          <ng-template let-item="item" let-i="index">
              <GridLayout rows="*" columns="48, *" class="item-menu">
                  <Label row="0" col="0" class="fa icon-item-menu" [text]="item.icon"></Label>
                  <Label row="0" col="1" style.verticalAlignment="center"
                      paddingBottom="1" class="text-item-menu fa" [text]="item.text"></Label>
              </GridLayout>
          </ng-template>
      </ListView>
  </GridLayout>

  <page-router-outlet tkMainContent></page-router-outlet>
</RadSideDrawer>`
})
export class AppComponent {
  public menu: Array<ItemMenu> = [];

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
        this.menu = [
            new ItemMenu(ICON_SETTINGS, 'Settings'),
            new ItemMenu(ICON_LOGOUT, 'Logout'),
        ];
    }
    @ViewChild(RadSideDrawerComponent, null) public drawerComponent: RadSideDrawerComponent;

    ngAfterViewInit() {
        this._changeDetectionRef.detectChanges();
    }

    public drawerClosed(args: DrawerStateChangingEventArgs) {
        console.log('Closing');
     //   this._newDataService.sendData('Hi my friend... I\'m closing');

    }

    onItemTap(args) {
        console.log("Item Tapped at cell index......: " + args.index);
    }

}
