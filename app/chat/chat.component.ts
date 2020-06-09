import { Component, OnInit } from '@angular/core';

export const ICON_EYE: string = String.fromCharCode(0xf06e);

class Conversation {
	constructor(public authorImg: string,
		public authorName: string,
		public hour: string,
		public lastMessage: string,
		public icon: string,
		public wasSeen: boolean,
		public showIcon: boolean,
		public colorIcon: string) {
	}
}


@Component({
	selector: 'ns-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css'],
	moduleId: module.id,
})
export class ChatComponent implements OnInit {
	public conversations: Array<Conversation> = [];
	public iconEye: string = ICON_EYE;

	constructor() {
		this.conversations = [
			new Conversation("~/images/kamel.jpg", "Kamel", "19:01", "3ach men chefek!", '', false, false, ''),
			new Conversation("~/images/malek.jpg", "Malek", "18:43", "winek hal 8iba ya weldi", '', true, false, ''),
			new Conversation("~/images/moataz.jpg", "Moataz", "18:41", "ahla bik hakim", '', true, false, ''),
			new Conversation("~/images/hakim.jpg", "Hakim", "18:35", "win haykom ya jem3a ", this.iconEye, true, true, '#1aa3ff'),
		];
	}

	ngOnInit() {
	}

	onItemTap(args) {
		console.log("Item Tapped at cell index......: " + args.index);
	}

}
