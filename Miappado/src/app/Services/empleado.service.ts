import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Asegúrate de importar HttpClient
import { appSettings } from '../Settings/appsettings'// Ajusta la ruta de la importación según sea necesario
import { Empleado } from '../Models/Empleado';
import { ResponseApi } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient); // Inyecta HttpClient en el servicio
  private urlApi = appSettings.apiUrl + 'Empleado';// URL de la API

  constructor() { }

  // Métodos para obtener todos los empleados
  lista()
  {
    return this.http.get<Empleado[]>(this.urlApi);
  }
  obtener(id: number)
  {
    //llaves invertidas para concatenar la ruta con el id
    return this.http.get<Empleado>(`${this.urlApi}/${id}`); //  Ajusta la ruta de la petición según sea necesario
  }
  crear(objeto: Empleado)
  {
    return this.http.post<ResponseApi>(this.urlApi, objeto); // Ajusta la ruta de la petición según sea necesario
  }
  editar(objeto: Empleado)
  {
    return this.http.put<ResponseApi>(this.urlApi, objeto); // Ajusta la ruta de la petición según sea necesario
  }
  eliminar(id: number)
  {
    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`); // Ajusta la ruta de la petición según sea necesario
  }
  
}
