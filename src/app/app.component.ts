import { Component, DoCheck, OnInit } from '@angular/core';
import { hide, init, show } from 'cookie-though';//"cookie-though" implements the modal where the cookie settings are selected 
import { Config } from 'cookie-though/dist/types/types';
import { onPreferencesChanged } from 'cookie-though';
import { Cookie } from 'ng2-cookies/ng2-cookies'; //"Cookie" from ng2-cookies is used to access browser cookies from Angular

//Google Analitycs
import { GoogleTagManagerService } from 'angular-google-tag-manager';//"GoogleTagManagerService" is used to inject Google Analytics into the project:


const config:Config ={
  "policies": [
    {
      "id": "essential",
      "label": "Cookies Esenciales",
      "description": "Necesitamos guardar algunas cookies técnicas para que el sitio web funcione correctamente.",
      "category": "essential",
    },
    // {
    //   "id": "functional",
    //   "label": "Functional Cookies",
    //   "category": "functional",
    //   "description": "We need to save some basic preferences eg. language.",
    // },
    {
      "id": "statistics",
      "label": "Estadísticas",
      "category": "statistics",
      "description": "Necesitamos guardar algunas cookies estadicticas para poder ayudarte a encontrar lo que buscas",
    },
    // {
    //   "id": "social",
    //   "label": "Social Media Cookies",
    //   "category": "social",
    //   "description": "We need to save some social cookies, for the website to function properly.",
    // },
  ],
  "essentialLabel": "Siempre activo",
  "permissionLabels": {
    "accept": "Aceptar",
    "acceptAll": "Aceptar todo",
    "decline": "Rechazar"
  },
  "cookiePreferenceKey": "cookie-preferences",
  "header": {
      "title": "Política de cookies",
      "subTitle": "Antes de comenzar",
      "description": "Todo el mundo quiere mostrar su mejor lado, y nosotros también. Por eso utilizamos cookies para garantizarte una mejor experiencia."
  },
  "cookiePolicy": {
    "url":"https://inthepocket.com/cookie-policy",
    "label":"Leer la declaración de cookies completa",
  },
  "customizeLabel": "Personalizar"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck
{
  title = 'cookie-though';

  constructor(    
    private gtmService: GoogleTagManagerService,
  ){

  }
  
  ngDoCheck(): void {    
    if(Cookie.get('cookie-preferences') && Cookie.get('cookie-preferences').slice(23,24) =='0'){
      Cookie.delete('_ga_3H062KCNW4')     
      Cookie.delete('_gat_UA-93345249-5')     
      Cookie.delete('_gid')     
      Cookie.delete('_ga') 
      show();
    }
  }
  
  ngOnInit(): void {
    init(config);  

    if(Cookie.get('cookie-preferences') && Cookie.get('cookie-preferences').slice(23,24) =='1'){
      this.gtmService.addGtmToDom();// this line adds the cookies
      hide();
    }

    if(Cookie.get('cookie-preferences') && Cookie.get('cookie-preferences').slice(23,24) =='0'){
      Cookie.delete('_ga_3H062KCNW4')     
      Cookie.delete('_gat_UA-93345249-5')     
      Cookie.delete('_gid')     
      Cookie.delete('_ga')
      
      show();
    }

    onPreferencesChanged((preferences)=> {  
      //This method "onPreferencesChanged" allows you to listen for changes of user preferneces.      
      preferences.cookieOptions.map(res =>{
        if(res.id == 'statistics' && res.isEnabled == false){
          //If the user rejects the cookies statistics that the popup stays open
          Cookie.delete('_ga_3H062KCNW4')     
          Cookie.delete('_gat_UA-93345249-5')     
          Cookie.delete('_gid')     
          Cookie.delete('_ga') 
          window.location.reload(); 
          show(); 
        }
        if(preferences.isCustomised && res.id == 'statistics' && res.isEnabled == true){
          this.gtmService.addGtmToDom();     
          hide();
        }
      })
    })
  }

  showCookie(){  
    show(); 
  }

  hideCookie(){
    hide();
  }

}

