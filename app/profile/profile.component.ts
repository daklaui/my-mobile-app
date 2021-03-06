import { ViewChild } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { Component, OnInit } from '@angular/core';
import * as utils from "tns-core-modules/utils/utils";
import { BackendServiceService } from "../backend-service.service";
const appSettings = require("tns-core-modules/application-settings");
export const ICON_EYE: string = String.fromCharCode(0xf06e);

class Photo {
	constructor(public image: string,
		public title: string,
		public description: string) {
	}
}


@Component({
	selector: 'ns-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	moduleId: module.id,
})
export class ProfileComponent implements OnInit {
	public photos: Array<Photo> = [];
	public iconEye: string = ICON_EYE;
public candidat:any;
	constructor(private backend:BackendServiceService) {
		this.photos = [
			new Photo("~/images/cyrine.jpg", "Here in Pucalá, Chiclayo Perú", "Hi my friends..."),
			new Photo("~/images/malek.jpg", "Here in Chiclayo", 'Hi ....'),
			new Photo("~/images/hakim.jpg", "Here in Lambayeque", ''),
		];
	}

	ngOnInit() {
this.backend.GetCandidat(appSettings.getNumber("id_user")).then(data=>{
this.candidat=data.content.toJSON();
})
	}

	onItemTap(args) {
		console.log("Item Tapped at cell index......: " + args.index);
	}

	openUrl(url: string) {
		utils.openUrl(url);
	}

}
