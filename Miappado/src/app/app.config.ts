import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';  // Asegúrate de que 'routes' esté exportado desde 'app.routes.ts'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // Configuración de las rutas
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule) // Importar el módulo HTTP
  ]
};
