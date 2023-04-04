import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    GoogleTagManagerModule.forRoot({
      id: 'GTM-NLXMFDD',//'id' indicated by Google analytics
    })
  ],
  providers: [ 
  //  CookieService,
  Cookie
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

