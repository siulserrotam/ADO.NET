using System.Data;
using System.Data.SqlClient;
using ApiAdo.Models;

namespace ApiAdo.Data
{
     public class EmpleadoData
    {
        private readonly string conexion;

        public EmpleadoData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("CadenaSQL");
        }

            //metodos para los procedimientos almacenados
            public async Task<List<Empleado>> Lista()
            {
            List<Empleado> lista = new List<Empleado>();
            
            using (var con = new SqlConnection(conexion))
                { 
                    await con.OpenAsync();
                    SqlCommand cmd = new SqlCommand("sp_listaEmpleados", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                        using (var reader = await cmd.ExecuteReaderAsync ())
                        {
                            while(await reader.ReadAsync())
                            {
                                lista.Add(new Empleado()
                                {
                                    IdEmpleado= Convert.ToInt32(reader["IdEmpleado"]),
                                    NombreCompleto = reader["NombreCompleto"].ToString(),
                                    Correo = reader["Correo"].ToString(),
                                    Sueldo = Convert.ToDecimal(reader["Sueldo"]),
                                    FechaContrato = reader["FechaContrato"].ToString()
                                });
                            }
                        }
                }
                return lista;
            }
    
            public async Task<Empleado> Obtener(int id)
            {
            Empleado objeto = new Empleado();
            
            using (var con = new SqlConnection(conexion))
                { 
                    await con.OpenAsync();
                    SqlCommand cmd = new SqlCommand("sp_obtenerEmpleado", con);

                    cmd.Parameters.AddWithValue("@IdEmpleado", id); //parametro del procedimiento almacenado
                    cmd.CommandType = CommandType.StoredProcedure; //tipo de comando

                        using (var reader = await cmd.ExecuteReaderAsync ())
                        {
                            while(await reader.ReadAsync())
                            {
                                objeto = new Empleado   
                                {
                                    IdEmpleado= Convert.ToInt32(reader["IdEmpleado"]),
                                    NombreCompleto = reader["NombreCompleto"].ToString(),
                                    Correo = reader["Correo"].ToString(),
                                    Sueldo = Convert.ToDecimal(reader["Sueldo"]),
                                    FechaContrato = reader["FechaContrato"].ToString()
                                };
                            }
                        }
                }
                return objeto;
            }
    
            public async Task<bool> Crear(Empleado objeto)
            {
            
                bool respuesta = true;
            
                using (var con = new SqlConnection(conexion))
                { 
                    SqlCommand cmd = new SqlCommand("sp_crearEmpleado", con);//nombre del procedimiento almacenado

                    cmd.Parameters.AddWithValue("@NombreCompleto", objeto.NombreCompleto); //parametro del procedimiento almacenado
                    cmd.Parameters.AddWithValue("@Correo", objeto.Correo); //parametro del procedimiento almacenado 
                    cmd.Parameters.AddWithValue("@Sueldo", objeto.Sueldo); //parametro del procedimiento almacenado
                    cmd.Parameters.AddWithValue("@FechaContrato", objeto.FechaContrato); //parametro del procedimiento almacenado

                    cmd.CommandType = CommandType.StoredProcedure; //tipo de comando

                    try
                    {
                        await con.OpenAsync();
                        respuesta = await cmd.ExecuteNonQueryAsync()>0 ? true : false;
                    }
                    catch 
                    {
                        respuesta = false;
                    }
                }
                return respuesta;
            }

            public async Task<bool> Editar(Empleado objeto)
            {
            
                bool respuesta = true;
            
                using (var con = new SqlConnection(conexion))
                { 
                    SqlCommand cmd = new SqlCommand("sp_editarEmpleado", con);//nombre del procedimiento almacenado

                    cmd.Parameters.AddWithValue("@IdEmpleado", objeto.IdEmpleado); //parametro del procedimiento almacenado
                    cmd.Parameters.AddWithValue("@NombreCompleto", objeto.NombreCompleto); //parametro del procedimiento almacenado
                    cmd.Parameters.AddWithValue("@Correo", objeto.Correo); //parametro del procedimiento almacenado 
                    cmd.Parameters.AddWithValue("@Sueldo", objeto.Sueldo); //parametro del procedimiento almacenado
                    cmd.Parameters.AddWithValue("@FechaContrato", objeto.FechaContrato); //parametro del procedimiento almacenado

                    cmd.CommandType = CommandType.StoredProcedure; //tipo de comando

                    try
                    {
                        await con.OpenAsync();
                        respuesta = await cmd.ExecuteNonQueryAsync()>0 ? true : false;
                    }
                    catch 
                    {
                        respuesta = false;
                    }
                }
                return respuesta;
            }
    
             public async Task<bool> Eliminar(int id)
            {
            
                bool respuesta = true;
            
                using (var con = new SqlConnection(conexion))
                { 
                    SqlCommand cmd = new SqlCommand("sp_eliminarEmpleado", con);//nombre del procedimiento almacenado

                    cmd.Parameters.AddWithValue("@IdEmpleado", id); //parametro del procedimiento almacenado
                    cmd.CommandType = CommandType.StoredProcedure; //tipo de comando

                    try
                    {
                        await con.OpenAsync();
                        respuesta = await cmd.ExecuteNonQueryAsync()>0 ? true : false;
                    }
                    catch 
                    {
                        respuesta = false;
                    }
                }
                return respuesta;
            }
    }
}