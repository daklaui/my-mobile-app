import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detaille-offre',
  templateUrl: './detaille-offre.component.html',
  styleUrls: ['./detaille-offre.component.css']
})
export class DetailleOffreComponent implements OnInit {

  constructor(private act:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.act.snapshot.params['id']);
  }

}
