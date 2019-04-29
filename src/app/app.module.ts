import { HttpServiceHelper } from './common/HttpServiceHelper';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogLevel } from 'msal';

import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { environment } from 'src/environments/environment.prod';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(`client logging: ${message}`);
}

export const protectedResourceMap: [string, string[]][] = [['https://buildtodoservice.azurewebsites.net/api/todolist', ['api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user']], ['https://graph.microsoft.com/v1.0/me', ['user.read']]];
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    MsalModule.forRoot({
      clientID: '17071bd2-7310-4bd1-9744-d9060609e5cc',
      authority: "https://login.microsoftonline.com/common/",
      validateAuthority: true,
      redirectUri: environment.redirectUrl,
      cacheLocation: "localStorage",
      postLogoutRedirectUri: environment.redirectUrl,
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
    Deeplinks,
    HttpServiceHelper,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
