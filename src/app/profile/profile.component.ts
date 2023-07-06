import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureaddemoService } from '../azureaddemo.service';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile?:Profile;
  ProfilePic?: SafeResourceUrl;
  constructor(private azureAdDemoService:AzureaddemoService,
    private domSanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getProfilePic();
  }

  getProfile()
  {
    this.azureAdDemoService.getUserProfile().subscribe(profileinfo =>
      {
        this.profile=profileinfo;
      })
  }
  getProfilePic()
  {
    this.azureAdDemoService.getUserProfilePic()
    .subscribe(response=>{
      var urlCreator = window.URL || window.webkitURL
      this.ProfilePic = this.domSanitizer.bypassSecurityTrustResourceUrl
      (
        urlCreator.createObjectURL(response)
      )
    })
  }
}
