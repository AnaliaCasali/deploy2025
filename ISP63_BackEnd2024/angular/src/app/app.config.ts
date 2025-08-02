import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorResponseInterceptor } from '../core/services/error-response.interceptor';


export const appConfig: ApplicationConfig = {
  providers:
    [
    provideHttpClient(withFetch(), withInterceptors([ErrorResponseInterceptor]))  ,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()), // agregue por security withFetch()
    provideAnimationsAsync('noop')
  ]
};
