import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Rutas de la aplicación
import { appConfig } from './app.config';  // Cambiar la importación a 'appConfig' en lugar de 'AppConfig'

@NgModule({
  declarations: [
    AppComponent,
    // Otros componentes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Importamos el módulo de rutas
  ],
  providers: [
    { provide: 'AppConfig', useValue: appConfig }  // Inyectamos la configuración global
  ],
  bootstrap: [AppComponent]  // Componente principal
})
export class AppModule { }
