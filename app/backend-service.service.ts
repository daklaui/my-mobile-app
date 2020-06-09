import { Injectable } from '@angular/core';
import { getFile, getImage, getJSON, getString, request, HttpResponse } from "tns-core-modules/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './Model/user.model';
import { Candidat } from './Model/candidat.model';
import { async } from 'rxjs/internal/scheduler/async';
import { Offre } from './Model/offre.model';
import { OffreListe } from './Model/offre.modelListe';
const BACKEND_LINK="http://92.222.83.184:9095";
@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
   usesr:User;
   ListeOfOffres:OffreListe[];
  constructor(private http: HttpClient) { }

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