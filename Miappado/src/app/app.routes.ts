import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { EmpleadoComponent } from './Pages/empleado/empleado.component';

export const routes: Routes = [
    { path: '', component: InicioComponent }, // Corrección: Establecer InicioComponent como ruta por defecto
    { path: 'inicio', component: InicioComponent }, // Ruta para el componente Inicio
    { path: 'Empleado/:id', component: EmpleadoComponent }, // Ruta dinámica con id de empleado
];
