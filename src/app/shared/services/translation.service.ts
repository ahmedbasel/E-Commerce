import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject,Renderer2,RendererFactory2  } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private renderer: Renderer2;

  _TranslationService=inject(TranslateService);
  _pid=inject(PLATFORM_ID)
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    this._TranslationService.addLangs(['ar', 'en']);
    this._TranslationService.setFallbackLang('en');

if(isPlatformBrowser(this._pid)){
  const langg = localStorage.getItem('lang') || 'en';
  this.changelan(langg)

}

   }




   changelan(lan:any){
    if(isPlatformBrowser(this._pid)){
      localStorage.setItem('lang', lan);

    this._TranslationService.use(lan);


    
      this.renderer.setAttribute(document.documentElement, 'dir', lan === 'ar' ? 'rtl' : 'ltr');

    }
    

   }
}
