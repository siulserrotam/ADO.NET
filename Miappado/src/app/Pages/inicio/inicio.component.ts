import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { EmpleadoService } from '../../Services/empleado.service'; // Importa tu servicio correctamente
import { Empleado } from '../../Models/Empleado'; // Asegúrate de tener la definición del modelo Empleado
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'] // Cambio a styleUrls
})
export class InicioComponent {

    // Uso de inject dentro de una propiedad para un componente standalone
    private empleadoServicio = inject(EmpleadoService);
    
    // Propiedades
    public listaEmpleados: Empleado[] = [];
    public displayedColumns: string[] = ['NombreCompleto', 'Correo', 'Sueldo', 'fechaContrato', 'acciones', 'accion'];
    
    // Método para obtener empleados
    obtenerEmpleados() {
      this.empleadoServicio.lista().subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.listaEmpleados = data;
          }
        },
        error: (err) => {
          console.log(err.message);
        }
      })
    }
      constructor(private router:Router){}

        Nuevo(){
          this.router.navigate(['/Empleado',0]);
        }

        Editar(Objeto: Empleado){
          this.router.navigate(['/Empleado',Objeto.idEmpleado]);  
        }
        
        Eliminar(Objeto: Empleado){
          if(confirm('¿Estás seguro de eliminar este empleado?'+Objeto.nombreCompleto)){
          this.empleadoServicio.eliminar(Objeto.idEmpleado).subscribe({
            next:(data)=>{
              if(data.issuccess){
                this.obtenerEmpleados();
              }else{
                alert("No se pudo Eliminar")
              }
            },
            error: (err) => {
              console.log(err.message);
            }
          })
        }
       }
  }
       
  


