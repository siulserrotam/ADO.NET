// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  // Importamos las rutas del archivo app.routes.ts

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configuramos el enrutamiento con las rutas del archivo app.routes.ts
  exports: [RouterModule]
})
export class AppRoutingModule {}
