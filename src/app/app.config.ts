import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withFetch,withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { headerInterceptor } from './shared/interceptor/header.interceptor';
import { errorInterceptor } from './shared/interceptor/error.interceptor';
import { provideToastr } from 'ngx-toastr';
import {provideTranslateService,TranslateLoader} from "@ngx-translate/core";
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";





export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor])),provideToastr(), provideAnimations(),  provideTranslateService({
    loader: provideTranslateHttpLoader({
      prefix: 'i18n/',
      suffix: '.json'
    }),
    fallbackLang: 'en',
    lang: 'en'
  })]
};
