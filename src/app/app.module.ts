import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogLevel } from 'msal';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(`client logging: ${message}`);
}

export const protectedResourceMap: [string, string[]][] = [['https://buildtodoservice.azurewebsites.net/api/todolist', ['api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user']], ['https://graph.microsoft.com/v1.0/me', ['user.read']]];
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    MsalModule.forRoot({
      clientID: '6226576d-37e9-49eb-b201-ec1eeb0029b6',
      authority: "https://login.microsoftonline.com/common/",
      validateAuthority: true,
      redirectUri: "http://localhost:8100/",
      cacheLocation: "localStorage",
      postLogoutRedirectUri: "http://localhost:8100/",
      navigateToLoginRequestUrl: true,
      popUp: false,
      consentScopes: ["user.read", "api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user"],
      unprotectedResources: ["https://www.microsoft.com/en-us/"],
      protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      correlationId: '1234',
      level: LogLevel.Info,
      piiLoggingEnabled: true
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
