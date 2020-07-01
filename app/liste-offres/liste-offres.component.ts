import { Component, OnInit } from '@angular/core';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { CardView } from "@nstudio/nativescript-cardview";
import { registerElement } from "nativescript-angular/element-registry";
import { BackendServiceService } from '../backend-service.service';
import { Offre } from '../Model/offre.model';
import { RouterExtensions } from 'nativescript-angular/router';
@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent implements OnInit {

   

  searchPhrase: string;
  onSearchSubmit(args): void {
      let searchBar = <SearchBar>args.object;
      console.log("You are searching for " + searchBar.text);
  }

  onButtonTap(id:Number): void {
    this.routerExtensions.navigate(["/Detaille",id], { clearHistory: true });
      console.log("Button was pressed" + id);
  }

  data = [];
    
  constructor(private backend:BackendServiceService, private routerExtensions: RouterExtensions) {
  }
 
  ngOnInit(): void { 
      this.data.push({ heading: "Chef D'agence de Voyage", content: "Le chef d'agence de voyages a une triple fonction à savoir managériale, de gestion et marketing. En effet, la planification,...", soc: "GO-Makkah Tunisie", loca: " Les Berges du Lac, Tunis, Tunisie"  });
      this.data.push({ heading: "Chef De Bar", content: "- Aisance relationnelle, excellente présentation. - Créativité. - Leadership. - Discrétion et pratique des plusieurs...", soc: "Cap Bon Kelibia Beach Hôtel & Spa", loca: "Kélibia, Kelibia, Tunisie" });
      this.data.push({ heading: "Chef Buanderie (Lingerie)", content: " Il est responsable du service lingerie et veille au bon fonctionnement du service. - Il véhicule l’image de...", icone: "fff", soc: "Cap Bon Kelibia Beach Hôtel & Spa", loca: "Kélibia, Kelibia, Tunisie" });
      this.data.push({ heading: "Animatrice Parc de Loisirs", content: "Accueillir et surveiller les enfants de 2 à 13 ans Imposer les règles de fonctionnement et contrôler le bon...", icone: "fff", soc: "YOYO LOISIRS", loca: "La Soukra, Tunis, Tunisie" });
      this.data.push({ heading: "Directeur D’hôtel 5*", content: "HOTEL GAFSA PALACE RECRUTE UN DIRECTEUR D'HÔTEL AGRÉÉ.", soc: "GAFSA PALACE", loca: "Gafsa, Gafsa, Tunisie" });
      this.data.push({ heading: "Gouvernante - Chef de Cuisine", content: "Un hotel 5 étoiles sis à la zone touristique du monastir cherche à recruter:  * Une gouvernante...", soc: "Hotel Sahel", loca: "Skanes Monastir, Monastir, Tunisie" });
      this.backend.GetListeDesOfres().then((data)=>{
        this.backend.ListeOfOffres=data.content.toJSON();
        console.log(this.backend.ListeOfOffres[0]); 
      });
   
  }
}
