import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {
  private readonly ANONYMOUS_ID_KEY = 'anonymousId';

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
    if (!this.getAnonymousId()) {
      this.setAnonymousId(this.generateAnonymousId());
    }
   }
   
  private generateAnonymousId(): string {
    return 'sd_' + Math.random().toString(36).substr(2, 9);
  }
  
  private getAnonymousId(): string | null {
    return localStorage.getItem(this.ANONYMOUS_ID_KEY);
  }

  private setAnonymousId(id: string): void {
    localStorage.setItem(this.ANONYMOUS_ID_KEY, id);
  }
   // Method to track events
  trackEvent(event: string, properties?: any) {
   mixpanel.track(event, properties);
   
  }

  // Method to identify users
  identifyUser(userId: string, name:string) {
    debugger;
    const anonymousId = this.getAnonymousId();
    if (anonymousId) {
      mixpanel.alias(userId, anonymousId);
      localStorage.removeItem(this.ANONYMOUS_ID_KEY);
    }
    var identifyUser = mixpanel.identify(userId);

   var  flag = mixpanel.people.set({
      '$name': name,
      '$email': userId
    }); 

  }
  setIdentity(userId: string, properties: Record<string, any>){
    const identifyUser = mixpanel.identify(userId);
    const flag = mixpanel.people.set(properties);
    // You might want to do something with identifyUser and flag here
  }

  eventWithUserInfo(userId: string){
    mixpanel.track("addtocart",{
      account_submitted: true,
      is_account_resubmitted: true
      })
     mixpanel.identify(userId);   
   
      mixpanel.people.set({"addtocart2": false})
        
  }
}
