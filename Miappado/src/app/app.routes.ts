import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { EmpleadoComponent } from './Pages/empleado/empleado.component';

export const routes: Routes = [

    {path:",component:HomeComponent},"},
    {path:'inicio',component:InicioComponent},
    {path:'Empleado/:id',component:EmpleadoComponent},
];
