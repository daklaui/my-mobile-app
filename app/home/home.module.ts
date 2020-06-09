import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { PostsComponent } from "../posts/posts.component";
import { ChatComponent } from "../chat/chat.component";
import { ProfileComponent } from "../profile/profile.component";
import { ListeOffresComponent } from '../liste-offres/liste-offres.component';
@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        HomeRoutingModule,

    ],
    declarations: [
        HomeComponent,
        PostsComponent,
        ChatComponent,
        ProfileComponent,
        ListeOffresComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
