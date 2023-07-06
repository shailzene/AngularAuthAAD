import { Component, OnInit } from '@angular/core';
import { AzureaddemoService } from '../azureaddemo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn:boolean =false;
  constructor( private azureAdDemoSerice:AzureaddemoService 
    ) { }

  ngOnInit(): void 
  {
    this.azureAdDemoSerice.isUserLoggedIn.subscribe(x=>
      {
        this.isUserLoggedIn=x;
      })
  }

}
