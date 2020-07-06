import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceService } from '../backend-service.service';
import { OffreListe } from '../Model/offre.modelListe';
import { TNSFancyAlert } from 'nativescript-fancyalert';
const appSettings = require("tns-core-modules/application-settings");
@Component({
  selector: 'app-detaille-offre',
  templateUrl: './detaille-offre.component.html',
  styleUrls: ['./detaille-offre.component.css'] 
})
export class DetailleOffreComponent implements OnInit {
  public x:Number;
  constructor(private act:ActivatedRoute ,private backend:BackendServiceService) { }

  async ngOnInit() {
     this.x=this.act.snapshot.params['id'];
    this.backend.offre= await  this.backend.GetOffreWithId(this.x).then((data)=>{
      return data.content.toJSON();
      //  console.log(this.backend.offre);  
    });
 console.log(this.backend.offre);


  }
  
  Postuler()
  {
    var date = new Date(); 
    var post = {
      DATE_POSTULER:date.toDateString(),
      ID_OFFRE:this.x,
      ID_CANDIDAT:appSettings.getNumber("id_user")
    }
    this.backend.Postuler(post).then(data=>{
      TNSFancyAlert.showSuccess(
        "Postulé avec succès!",
     
      ).then(() => {
      //  this.routerExtensions.navigate(["/home"], { clearHistory: true });
      });
    });
  }


  

}
