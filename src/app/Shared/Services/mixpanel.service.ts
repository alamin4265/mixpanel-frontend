import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  constructor() {
    //daa76dd6afd4babe15f321a4e77a3ded  -me
    //874f28d8800d06ca29cf542aa0b618ad  -bhai
    //d8755e3269ece983394f169c00ae58cd  -samia
    mixpanel.init('874f28d8800d06ca29cf542aa0b618ad', {
      api_host: "http://localhost:3000",
      debug: true,
      track_pageview: true,
      persistence: 'localStorage',
    });
   }

   // Method to track events
  trackEvent(event: string, properties?: any) {
   var flag =  mixpanel.track(event, properties);
   console.log(flag);
  }

  // Method to identify users
  identifyUser(userId: string, name:string) {
    debugger;
    let newUserId = "user_124";
    // var aliasUser = mixpanel.alias(userId);
    var identifyUser = mixpanel.identify(userId);

   var  flag = mixpanel.people.set({
      '$name': name,
      '$email': userId
    }); 

  }
  eventWithUserInfo(userId: string){
      mixpanel.identify(userId);
      mixpanel.track("price2",{
      account_submitted: true,
      is_account_resubmitted: true
      })   
      mixpanel.people.set({"price2": true})
  }
}
