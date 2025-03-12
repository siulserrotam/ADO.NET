import { Component, inject, Input, OnInit } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EmpleadoService } from '../../Services/empleado.service'; 
import { Empleado } from '../../Models/Empleado'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-empleado',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'] // Cambié styleUrl por styleUrls
})
export class EmpleadoComponent implements OnInit {

  @Input() idEmpleado!: number; 
  private empleadoServicio = inject(EmpleadoService); 
  public formBuilder = inject(FormBuilder); 

  public formEmpleado: FormGroup = this.formBuilder.group({ 

    nombreCompleto: [''],
    correo: [''],
    sueldo: [''],
    fechaContrato: ['']
  });

  constructor(private router: Router) {} 

  ngOnInit(): void { 
    if (this.idEmpleado != 0) {
      this.empleadoServicio.obtener(this.idEmpleado).subscribe({
        next: (data) => {
          this.formEmpleado.patchValue({
            nombreCompleto: data.nombreCompleto,
            correo: data.correo,
            sueldo: data.sueldo,
            fechaContrato: data.fechaContrato
          });
        },
        error: (err) => console.log(err.message)
      });
    }
  }

  guardar(){ 
    const Objeto: Empleado = {
      idEmpleado: this.idEmpleado,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      correo: this.formEmpleado.value.correo,
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: this.formEmpleado.value.fechaContrato
    };
    
    if (this.idEmpleado == 0) {
      this.empleadoServicio.crear(Objeto).subscribe({
        next: (data) => {
          if (data.issuccess) {
            this.router.navigate(["/"]);
          } else {
            alert("Error al crear");
          }
        },
        error: (err) => console.log(err.message)
      });
    } else {
      this.empleadoServicio.editar(Objeto).subscribe({
        next: (data) => {
          if (data.issuccess) {
            this.router.navigate(["/"]);
          } else {
            alert("Error al editar");
          }
        },
        error: (err) => console.log(err.message)
      });
    }
  }

  volver(): void {
    this.router.navigate(["/"]);
  }
}
