import { Injectable } from '@angular/core';
import { getFile, getImage, getJSON, getString, request, HttpResponse } from "tns-core-modules/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './Model/user.model';
import { Candidat } from './Model/candidat.model';
import { async } from 'rxjs/internal/scheduler/async';
import { Offre } from './Model/offre.model';
import { OffreListe } from './Model/offre.modelListe';
import { Observable } from 'tns-core-modules/ui/page';
const BACKEND_LINK="http://92.222.83.184:9095";
@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
   usesr:User;
   ListeOfOffres:OffreListe[];
   offre:OffreListe;
  constructor(private http: HttpClient) { 
this.offre=new OffreListe();

  }

Login(user:User):Promise<any>
{

  return   request({
    url: BACKEND_LINK+"/api/Login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify(user)
});


//console.log(this.usesr);
}

GetListeDesOfres():Promise<any>
{
  return   request({
    url: BACKEND_LINK+"/api/Offre",
    method: "GET",
    headers: { "Content-Type": "application/json" }
});
} 



GetListePostulation(id:Number):Promise<any>
{
  return   request({
    url: BACKEND_LINK+"/api/GetPostulationParCandidat/"+id,
    method: "GET",
    headers: { "Content-Type": "application/json" }
});
} 



Postuler(postul:any):Promise<any>
{
  return   request({
    url: BACKEND_LINK+"/api/PostPostulationParCandidat",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  content: JSON.stringify(postul)
});
} 

async GetOffreWithId(id:Number):Promise<any>
{
  return   request({
    url: BACKEND_LINK+"/api/Offre/"+id,
    method: "GET",
    headers: { "Content-Type": "application/json" }
});
} 

async GetCandidat(id:Number):Promise<any>
{
  return   request({
    url: BACKEND_LINK+"/api/Candidat/"+id,
    method: "GET",
    headers: { "Content-Type": "application/json" }
});
} 
  //let options = this.createRequestOptions();
  //return this.http.post(BACKEND_LINK, { user }, { headers: options });


SaveCandidat(candidat:Candidat) : Promise<any>
{
return   request({
  url: BACKEND_LINK+"/api/Candidat",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  content: JSON.stringify(candidat)
  });
}

SaveLogin(user:User) : Promise<any>
{
 return  request({
    url: BACKEND_LINK+"/api/User",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify(user)
});
}

private createRequestOptions() {
  let headers = new HttpHeaders({
      "Content-Type": "application/json"
  });
  return headers;
}
}