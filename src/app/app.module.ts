import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { AzureaddemoService } from './azureaddemo.service';

const isIE=window.navigator.userAgent.indexOf('MSIE')>-1
||window.navigator.userAgent.indexOf('Trident/')>-1

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId:'3fd37654-3ae0-4835-8cf1-f0e7160a9b31',
            redirectUri:'http://localhost:4200',
            authority:'https://login.microsoftonline.com/68db3c52-ffc1-4856-aa1e-a83e22119249'
          },
          cache:{
            cacheLocation:'localStorage',
            storeAuthStateInCookie:isIE
          }
        }
      ),
      {
        interactionType:InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
          interactionType:InteractionType.Redirect,
          protectedResourceMap: new Map(
            [
              ['https://graph.microsoft.com/v1.0/me',['user.Read']],
              ['localhost',['api://2b522a1e-7c9f-4e4a-a724-800ff8cdd428/api.scope']]

            ]
          )
      })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  }, MsalGuard,AzureaddemoService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
