import { Component, OnInit } from '@angular/core';

export const ICON_SHARE = String.fromCharCode(0xf14d);
export const ICON_HEART = String.fromCharCode(0xf004);
export const ICON_RETWEET = String.fromCharCode(0xf005);

class Post {
	constructor(public authorImg: string,
		public authorName: string,
		public color: string,
		public date: string,
		public title: string,
		public postImg: string,
		public likes: string,
		public share: string,
		public repost: string) { }
}


@Component({
	selector: 'ns-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css'],
	moduleId: module.id,
})
export class PostsComponent implements OnInit {
	public posts: Array<Post> = [];
	public iconComments = ICON_SHARE;
	public iconHeart = ICON_HEART;
	public iconRetweet = ICON_RETWEET;
	constructor() {
		this.posts = [
			new Post("~/images/cyrine.jpg", "cyrine", "#747474", "Today at 17:45", "booking airline tickets !", "~/images/offre3.png", "", "", ""),
			new Post("~/images/cyrine.jpg", "cyrine", "#E15050", "Today at 16:21", "interesting offer 🌞", "~/images/offre2.png", "", "", ""),
			new Post("~/images/cyrine.jpg", "cyrine", "#E15050", "Today at 15:10", "offer ", "~/images/offre1.png", "", "", ""),
		];
	}

	ngOnInit() {
	}

	onItemTap(args) {
		console.log("Item Tapped at cell index......: " + args.index);
	}

}
