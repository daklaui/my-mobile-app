import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { User } from '../Model/user.model';
import { BackendServiceService } from '../backend-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  isrequired:Boolean=false;
  MessageError:String="";
  userResult:User;
constructor(private backend:BackendServiceService, private routerExtensions: RouterExtensions){
  this.user = new User();
}

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
	submit() {
		if (!this.user.isValidEmail()) {
       this.isrequired=true;
       this.MessageError="Enter a valid email address";
			return;
		}
		else{

      this.isrequired=false;
         this.backend.Login(this.user).then((response) => {
        this.userResult =response.content.toJSON();
              if(this.userResult.ID_USER>0 || this.userResult.ID_USER!=undefined)
              {
                this.routerExtensions.navigate(["/home"], { clearHistory: true });
              }
          }, (e) => {
            console.log("mosataz"+e);
          });
    }
	}
}

