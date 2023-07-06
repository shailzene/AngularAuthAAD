import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureaddemoService } from '../azureaddemo.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  pdfUrl?: SafeResourceUrl
  reporstStatus?:string
  constructor(private azureAdDemoService: AzureaddemoService,
    private domSanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
  }
  getReport() {

    this.azureAdDemoService.getReport().subscribe(response =>
      {
        var urlCreator =window.URL || window.webkitURL;
        this.pdfUrl =this.domSanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(response))
      },
      (error:HttpErrorResponse)=>{
        if(error.status==401 || error.status==403){
          alert("You are unauthorised")
        }
      }
      )
  }
  getReporstStatus()
  {
    this.azureAdDemoService.getReportStatus().subscribe
    (response=>
      {
     
        this.reporstStatus=response.status
      })
  }
}
