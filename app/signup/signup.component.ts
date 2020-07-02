import { AfterViewInit, Component, OnInit } from "@angular/core";

import { Page } from "tns-core-modules/ui/page";
import { topmost } from "ui/frame";
import { Label } from "tns-core-modules/ui/label";
import { Button } from "tns-core-modules/ui/button";
import { View } from "tns-core-modules/ui/core/view";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Visibility } from "tns-core-modules/ui/enums";
import { isAndroid } from "tns-core-modules/platform";
import { Color } from "tns-core-modules/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { alert } from "tns-core-modules/ui/dialogs/dialogs";
import * as imageSourceModule from  "image-source";
import * as fs from "file-system";
const FilePicker   =require("nativescript-plugin-filepicker"); 
const imagepicker = require("nativescript-imagepicker");

import * as app from 'tns-core-modules/application';
import { NativeScriptDateTimePickerModule } from "nativescript-datetimepicker/angular";
import { User } from "../Model/user.model";
import { Candidat } from "../Model/candidat.model";
import { BackendServiceService } from "../backend-service.service";
import { RouterExtensions } from "nativescript-angular/router";

const permissions = require('nativescript-permissions');
const DEFAULT_STEP = 'item-stepper';
const CURRENT_STEP = 'item-stepper current-step';
const SUCCESSFUL_STEP = 'item-stepper successful-step';
const BASE_COLOR = '#024184';
declare const kUTTypePDF, kUTTypeText;
enum MoveTo {
  Left,
  Right
}
const appSettings = require("tns-core-modules/application-settings");
@Component({
  selector: 'app-signup',
  moduleId: module.id,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  isrequired=false;
  public RequiredLabel=0;
  isrequiredPassword=false;
  user:User;
  candidat:Candidat;
  MessageError:String="";
  MessageErrorPassword="";
  public selectedDate: Date;
  public isOnOpenDepartureDate: boolean = false;
  public departureDate = new Date();
  public returnDate = new Date();
  public dateSelector = new Date();
  public currentStep = 1;
  public rotateItemImageStepper1 = 0;
  public rotateItemImageStepper2 = 0;
  public rotateItemImageStepper3 = 0;
  private _translate = 104;
  private _animationDuration = 300;
  private _btnPrevious: Button;
  private _btnNext: Button;
  private _itemStepper1: Label;
  private _itemStepper2: Label;
  private _itemStepper3: Label;
  private _itemImageStepper1: View; 
  private _itemImageStepper2: View;
  private _itemImageStepper3: View;
  private moveTo: MoveTo = MoveTo.Right;
  private previousMovesTo: MoveTo;
  private _selectDateGridLayout: GridLayout;
  private _overlayGridLayout: GridLayout;

  constructor(private page: Page,private backend:BackendServiceService, private routerExtensions: RouterExtensions) {   var returnDate = new Date(); 
    returnDate.setDate(returnDate.getDate() + 2);
    this.returnDate = returnDate;
this.user=new User();
this.candidat=new Candidat();
}
  
  ngOnInit() {
    this.page.actionBarHidden = true;
    this._btnPrevious = this.page.getViewById('btnPrevious');
    this._btnNext = this.page.getViewById('btnNext');
    this._itemImageStepper1 = this.page.getViewById('itemImageStepper1');
    this._itemImageStepper2 = this.page.getViewById('itemImageStepper2');
    this._itemImageStepper3 = this.page.getViewById('itemImageStepper3');
    this._itemStepper1 = this.page.getViewById('itemStepper1');
    this._itemStepper2 = this.page.getViewById('itemStepper2');
    this._itemStepper3 = this.page.getViewById('itemStepper3');
    this._selectDateGridLayout = this.page.getViewById('selectDateGridLayout');
    this._overlayGridLayout = this.page.getViewById('overlayGridLayout');
    appSettings.clear();

  }

public myImage="";
public linkFile="Selection done";
public linkFiles="";
  
 /**
     * openCustomFiles
     */
     openCustomFilesPicker() {
        let context = FilePicker.create({
            mode: "single", // use "multiple" for multiple selection
             extensions: ["pdf","doc", "docx"]
        });
        context
    .authorize()
    .then(()=>{
        return context.present();
    })
    .then((selection)=>{ 
        selection.forEach((selected) =>{
            // process the selected file
            let path = fs.path.join(selected);
            const file = fs.File.fromPath(path);
            console.log("Selection done: " + selected);
            this.linkFile="Selection done: " + file.name;
            this.linkFiles=selected;
           // this.sendImages(selected) ;
            //alert( this.linkFile);
        });
    }).catch(function (e) {
        // process error
    });
    }



getPicture(){
    permissions.requestPermission("android.permission.READ_EXTERNAL_STORAGE", "I need these permissions because I'm cool")
    .then( () => {
       console.log("Woo Hoo, I have the power!");

       
  var milliseconds = (new Date).getTime();
  var that = this;
  let context = imagepicker.create({
      mode: "single"
  });
  context.authorize().then(()=>{
      return context.present();
  })
  .then(selection=>{
      // console.dir(that.profileImage);
      const imageAsset = selection.length > 0 ? selection[0] : null;
      imageAsset.options.autoScaleFactor = false;
      imageAsset.options ={
        width:500,
        height:500
    }
     imageAsset.options.keepAspectRatio = true;
      imageSourceModule.fromAsset(imageAsset).then(
        savedImage => {
            var newheight = savedImage.height,
                                newwidth = savedImage.width
                            if (savedImage.width > 500 && savedImage.height > 500) {
                                if (savedImage.width > savedImage.height) {
                                    newwidth = 500
                                    newheight = Math.round(500 * (savedImage.height / savedImage.width))
                                } else {
                                    newheight = 500
                                    newwidth = Math.round(500 * (savedImage.width / savedImage.height))
                                }
                            }
            let filename = "image" + "-" + new Date().getTime() + ".png";
            let folder = fs.knownFolders.documents();
            let path = fs.path.join(folder.path, filename);
            savedImage.saveToFile(path, "png");
            var loadedImage = imageSourceModule.fromFile(path);
            this.myImage=path;    
            
              
        });


  }).catch(function (e) {
      console.log("text "+e);
  });
    })
    .catch( () => {
       console.log("Uh oh, no permissions - plan B time!");
    });


}
/****************************************************************************** */

 extractImageName(fileUri) {
    var pattern = /[^/]*$/;
    var imageName = fileUri.match(pattern);

    return imageName;
}


 sendImages(fileUri):Promise<any> {


        return new Promise((resolve,reject)=>{
            let imageName = this.extractImageName(fileUri);
            var name = fileUri.substr(fileUri.lastIndexOf("/") + 1);
            var bghttp = require("nativescript-background-http");
            var session = bghttp.session("file-upload");
            var request = {
                //api/FileUploading
                url: "http://92.222.83.184:9095/api/FileUploading",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "File-Name": name
                },
                description: "Uploading " + name
            };
            var params = [
                { name: "test", value: "value" },
                { name: name, filename: fileUri, mimeType: 'image/jpeg' }
            ];
            var task = session.multipartUpload(params, request);
            task.on("progress", logEvent);
            task.on("error", logEvent);
            task.on("complete", (data)=>{
               // console.log("complet");
                resolve(data);
            });
            function logEvent(e) {
                console.log("currentBytes: " + e.currentBytes);
                console.log("totalBytes: " + e.totalBytes);
                console.log("eventName: " + e.eventName);
            }
        });
     


    
   // return task;
}

/****************************************************************************** */

  Validation():boolean
 {
   
     
    switch (this.currentStep) {
        case 1: {

            let password = <TextField>this.page.getViewById('password');
           
  
    if(this.user.LOGIN=="")
   {
       this.isrequired=true;
       this.MessageError="Champ Obligatoire *";
   }
   else if (!this.user.isValidEmail())
   {
    this.isrequired=true;
    this.MessageError="Entrez une adresse email valide";
   }
   else if (password.text=="")
   {
    this.isrequired=false;
       this.isrequiredPassword=true;
       this.MessageErrorPassword="Champ Obligatoire *";
   }
   else if(this.user.PASSWORD!=password.text)
   {
    this.isrequired=false;
    this.isrequiredPassword=true;
    this.MessageErrorPassword="Les Mots de passe no correspondent pas";
   }
   else if(!this.user.isValidPassword())
   {
    this.isrequired=false;
    this.isrequiredPassword=true;
    this.MessageErrorPassword="Le mot de passe doit avoir au minimum 6 caractéres avec une lettre en majuscule et des chiffres";
   }
   else{
    this.isrequired=false;
    this.isrequiredPassword=false;
       return true;
   }

             

   break;
   /*

            if(this=="" || password.text=="" ||confirmePassword.text=="" || confirmePassword.text!=password.text)
            {
            this.isrequired=true;
            return false;
            }
            else
            {
                this.isrequired=false;
                return true; 
            }
 
           */
        }
        case 2: {
            let Nom = <TextField>this.page.getViewById('Nom');
            let Prenom = <TextField>this.page.getViewById('Prenom');
            let SelectDate = <TextField>this.page.getViewById('SelectDate');
            let Cin = <TextField>this.page.getViewById('Cin');
            let Telephone = <TextField>this.page.getViewById('Telephone');
           /*Verificaton Nom et prenom candidat */
            if(this.candidat.NOM=="" || this.candidat.NOM==undefined )
            {
                this.RequiredLabel=1;
                this.MessageError="Champ Obligatoire *";
            }
            else if (this.candidat.NOM.length<4)
            {
                this.RequiredLabel=1;
             this.MessageError="4 Caractéres au minimum "; 
            }

            else if (this.candidat.PRENOM=="" || this.candidat.PRENOM==undefined)
            {
                this.RequiredLabel=2;
                this.MessageError="Champ Obligatoire *";
            }
            else if (this.candidat.PRENOM.length<4)
            {
                this.RequiredLabel=2;
             this.MessageError="4 caractéres au minimum ";
            }
            /****************END********************/

            /**********************Verification date de naissence***********************/
            else if (this.candidat.DATE_NAISSENCE.toString()=="" || this.candidat.DATE_NAISSENCE==undefined)
            {
                this.RequiredLabel=3;
             this.MessageError="Champ Obligatoire * ";
            }
            /*****************************END************** */

            /**********************Verification CIN***********************/
            else if (this.candidat.CIN=="" || this.candidat.CIN==undefined)
            {
                this.RequiredLabel=4;
             this.MessageError="Champ Obligatoire* ";
            }
           
            else if (this.candidat.CIN.length!=8)
            {
                this.RequiredLabel=4;
             this.MessageError="Cin failed* ";
            }
            /*****************************END************** */
            /**********************Verification CIN***********************/
            else if (this.candidat.TELEPHONE=="" || this.candidat.TELEPHONE==undefined)
            {
                this.RequiredLabel=5;
             this.MessageError="Champ Obligatoire * ";
            }
           
            else if (this.candidat.TELEPHONE.length!=8)
            {
                this.RequiredLabel=5;
             this.MessageError="Telephone failed * ";
            }
                /*****************************END************** */
            else{
                this.RequiredLabel=0;
                return true;
            }
         

            break;

        }
        case 3: {
            
        }
    }


 


 }



  ngAfterViewInit(): void {
    setTimeout(() => {
        let target = this._itemImageStepper1;
        target.animate({ opacity: 1, duration: this._animationDuration })
            .then(() => {
                console.log('Animation Finished!');
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, 3200)
}
  animateGoForward() {

    let email = <TextField>this.page.getViewById('email');
    let password = <TextField>this.page.getViewById('password');
    let confirmePassword = <TextField>this.page.getViewById('confirmepassword');
    let Nom = <TextField>this.page.getViewById('Nom');
    let Prenom = <TextField>this.page.getViewById('Prenom');
    let SelectDate = <TextField>this.page.getViewById('SelectDate');
    let Cin = <TextField>this.page.getViewById('Cin');
    let Telephone = <TextField>this.page.getViewById('Telephone');
    let Adresse = <TextField>this.page.getViewById('Adresse');
    switch (this.currentStep) {
        case 1: {
       
      if(this.Validation())
      {
        appSettings.setString("email", email.text);
        appSettings.setString("password", password.text);
        appSettings.setString("confirmePassword", confirmePassword.text);

        this.disableButtons();
        this.previousMovesTo = this.moveTo;
        this.moveTo = MoveTo.Right;
        this.itemImageStepper1GoForward(); 
      }    
            break;
        }
        case 2: {
            if(this.Validation())
            {
                appSettings.setString("Nom", Nom.text);
                appSettings.setString("Prenom", Prenom.text);
                appSettings.setString("SelectDate", SelectDate.text);
                appSettings.setString("Cin", Cin.text);
                appSettings.setString("Telephone", Telephone.text);

                if (this.previousMovesTo === MoveTo.Left) {
                    this.itemImageStepper2GoForwardPreviousStepLeft();
                } else {
                    this.itemImageStepper2GoForward();
                }

            }
           
            break;
        }
        default: {
         this.enableButtons();
         console.log(this.user);
         console.log(this.candidat);
         console.log(this.myImage);
           if(this.myImage.length>0)
           {
            this.sendImages(this.myImage);
           }
           if(this.linkFiles.length>0)
           {
            this.sendImages(this.linkFiles);
           }
           
           this.Register(this.user,this.candidat);
           break;
        }
    }
}


//

Register(user:User,candidat:Candidat) 
{
    user.TYPE_COMPTE="Candidat";
    this.backend.SaveLogin(user);
  /***********************GET ID_USER************************ */
    this.backend.Login(user).then((response) => {
        let ID_user =response.content.toJSON().ID_USER;
        candidat.ID_USER=ID_user;
        candidat.EMAIL=response.content.toJSON().LOGIN;
   /************************INSERT CANDIDAT ********************************* */
     this.backend.SaveCandidat(candidat).then((response) => {
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
 
     });
   /************************************************************************* */
          }, (e) => {
            console.log("mosataz"+e);
          });
    
}




GetDataPage1()
{
    if(appSettings.getString("email")!=undefined &&  appSettings.getString("password")!=undefined && appSettings.getString("confirmePassword")!=undefined)
    {
        let email = <TextField>this.page.getViewById('email');
        let password = <TextField>this.page.getViewById('password');
        let confirmePassword = <TextField>this.page.getViewById('confirmepassword');
        email.text=appSettings.getString("email");
        password.text=appSettings.getString("password");
        confirmePassword.text=appSettings.getString("confirmePassword");
    }
  
}

GetDataPage2()
{
    if(appSettings.getString("Nom")!=undefined &&  appSettings.getString("Prenom")!=undefined && appSettings.getString("SelectDate")!=undefined&& appSettings.getString("Cin")!=undefined&& appSettings.getString("Telephone")!=undefined)
    {
        let Nom = <TextField>this.page.getViewById('Nom');
        let Prenom = <TextField>this.page.getViewById('Prenom');
        let SelectDate = <TextField>this.page.getViewById('SelectDate');
        let Cin = <TextField>this.page.getViewById('Cin');
        let Telephone = <TextField>this.page.getViewById('Telephone');
    
        Nom.text=appSettings.getString("Nom");
        Prenom.text=appSettings.getString("Prenom");
        SelectDate.text=appSettings.getString("SelectDate");
        Cin.text=appSettings.getString("Cin");
        Telephone.text=appSettings.getString("Telephone");
    }
  
}


GetDataPage3()
{
    if(appSettings.getString("Adresse")!=undefined )
    {
        let Adresse = <TextField>this.page.getViewById('Adresse');
        Adresse.text=appSettings.getString("Adresse");
    }
  
}


animateBackward() {
    this.disableButtons();
    this.previousMovesTo = this.moveTo;
    this.moveTo = MoveTo.Left;
    let Adresse = <TextField>this.page.getViewById('Adresse');
    switch (this.currentStep) {
        case 2: {
            if (this.previousMovesTo === MoveTo.Left && this.moveTo === MoveTo.Left) {
                this.itemImageStepper2BackwardPreviousStepLeft();
            } else {
           
                this.itemImageStepper2BackwardPreviousStepRight();
             
            }
            break;
        }
        case 3: {
            appSettings.setString("Adresse", Adresse.text);
            this.itemImageStepper3Backward();
            break;
        }
        default: {
            this.enableButtons();
            break;
        }
    }
}
itemImageStepper1GoForward() {
  let translate: number = this._translate;
  let duration = this._animationDuration;
  let target = this._itemImageStepper1;
  let targetNext = this._itemImageStepper2;
  target.animate({ translate: { x: translate, y: 0 }, duration: duration })
      .then(() => target.animate({ opacity: 0, duration: duration }))
      .then(() => target.animate({ translate: { x: 0, y: 0 }, duration: 0 }))
      .then(() => {
          this._itemStepper2.className = CURRENT_STEP;
          this._itemStepper1.className = SUCCESSFUL_STEP;
          targetNext.animate({ opacity: 1, duration: duration })
      })
      .then(() => {
          this.currentStep++;
          //this.selectReturn = true;
          this.enableButtons();
          console.log('Animation Finished!');
      })
      .catch((e) => {
    
          console.log(e.message);
      });
}

itemImageStepper2GoForward() {
  let translate: number = this._translate;
  let duration = this._animationDuration;
  let target = this._itemImageStepper2;
  let targetNext = this._itemImageStepper3;
  target.animate({ translate: { x: translate, y: 0 }, duration: duration })
      .then(() => target.animate({ opacity: 0, duration: duration }))
      .then(() => target.animate({ translate: { x: 0, y: 0 }, duration: 0 }))
      .then(() => {
          this._itemStepper3.className = CURRENT_STEP;
          this._itemStepper2.className = SUCCESSFUL_STEP;
          targetNext.animate({ opacity: 1, duration: duration })
      })
      .then(() => {
          this.currentStep++;
          this.enableButtons();
          console.log("Animation finished");
      })
      .catch((e) => {
          console.log(e.message);
      });
}

itemImageStepper2GoForwardPreviousStepLeft() {
  let translate: number = this._translate;
  let target = this._itemImageStepper2;
  let duration = this._animationDuration;
  let targetNext = this._itemImageStepper3;
  target.animate({ rotate: 360, duration: this._animationDuration })
      .then(() => {
          target.rotate = 0;
          this.rotateItemImageStepper2 = 0;
      })
      .then(() => target.animate({ translate: { x: translate, y: 0 }, duration: duration }))
      .then(() => target.animate({ opacity: 0, duration: duration }))
      .then(() => target.animate({ translate: { x: 0, y: 0 }, duration: 0 }))
      .then(() => {
          this._itemStepper2.className = SUCCESSFUL_STEP;
          this._itemStepper3.className = CURRENT_STEP;
          targetNext.animate({ opacity: 1, duration: duration })
      })
      .then(() => {
          this.currentStep++;
          this.enableButtons();
          console.log("Animation finished");
      })
      .catch((e) => {
          console.log(e.message);
      });
}

itemImageStepper2BackwardPreviousStepRight() {
  let translate: number = this._translate;
  let duration = this._animationDuration;
  let target = this._itemImageStepper2;
  let targetPrevious = this._itemImageStepper1;

  target.animate({ rotate: 360, duration: this._animationDuration })
      .then(() => {
          target.rotate = 0;
          this.rotateItemImageStepper2 = 180;
      })
      .then(() => target.animate({ translate: { x: -translate, y: 0 }, duration: duration }))
      .then(() => target.animate({ opacity: 0, duration: duration }))
      .then(() => target.animate({ translate: { x: 0, y: 0 }, duration: 0 }))
      .then(() => {
          this.rotateItemImageStepper2 = 0;
          this._itemStepper2.className = DEFAULT_STEP;
          this._itemStepper1.className = CURRENT_STEP;
          this.currentStep--;
      })
      .then(() => targetPrevious.animate({ opacity: 1 }))
      .then(() => {
          this.enableButtons();
          console.log("Animation finished");
      })
      .catch((e) => {
          console.log(e.message);
      });
}

itemImageStepper2BackwardPreviousStepLeft() {
  let translate: number = this._translate;
  let duration = this._animationDuration;
  let target = this._itemImageStepper2;
  let targetPrevious = this._itemImageStepper1;
  target.animate({ translate: { x: -translate, y: 0 }, duration: duration })
      .then(() => target.animate({ opacity: 0, duration: duration }))
      .then(() => target.animate({ translate: { x: 0, y: 0 }, duration: 0 }))
      .then(() => {
          this.rotateItemImageStepper2 = 0;
          this._itemStepper2.className = DEFAULT_STEP;
          this._itemStepper1.className = CURRENT_STEP;
          this.currentStep--;
      })
      .then(() => targetPrevious.animate({ opacity: 1 }))
      .then(() => {
          this.enableButtons();
          console.log("Animation finished");
      })
      .catch((e) => {
          console.log(e.message);
      });
}

itemImageStepper3Backward() {
  let translate: number = this._translate;
  let duration = this._animationDuration;
  let target = this._itemImageStepper3;
  let targetPrevious = this._itemImageStepper2;
  target.animate({ rotate: 360, duration: duration })
      .then(() => {
          target.rotate = 0;
          this.rotateItemImageStepper3 = 180;
      })
      .then(() => target.animate({ translate: { x: -translate, y: 0 }, duration: duration }))
      .then(() => target.animate({ opacity: 0, duration: duration }))
      .then(() => target.animate({ translate: { x: 0, y: 0 }, duration: 0 }))
      .then(() => {
          this.rotateItemImageStepper3 = 0;
          this.rotateItemImageStepper2 = 180;
          this._itemStepper3.className = DEFAULT_STEP;
          this._itemStepper2.className = CURRENT_STEP;
          this.currentStep--;
      })
      .then(() => targetPrevious.animate({ opacity: 1, duration: duration }))
      .then(() => {
          // this.dataList = this.flightData.flightDepart;
          this.enableButtons();
          console.log("Animation finished");
      })
      .catch((e) => {
          console.log(e.message);
      });

}

enableButtons() {
    this._btnPrevious.isEnabled = true;
    this._btnNext.isEnabled = true;
}

disableButtons() {
    this._btnPrevious.isEnabled = false;
    this._btnNext.isEnabled = false;
}


    // Select Date
    onOpenSelectDate(event) {
      this.isOnOpenDepartureDate = event;

      if (this.isOnOpenDepartureDate) {
          this.dateSelector = this.departureDate;
      } else {
          this.dateSelector = this.returnDate;
      }

      this._selectDateGridLayout.visibility = <any>Visibility.visible;
      this._selectDateGridLayout.className = 'select-date animate-bounceInUp-delay-0ms';
      this._overlayGridLayout.animate({ opacity: 0.5, duration: 300 });
  }

}
