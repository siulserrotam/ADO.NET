using Microsoft.AspNetCore.Mvc;
using ApiAdo.Models;
using ApiAdo.Data;

namespace ApiAdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
       private readonly EmpleadoData _empleadoData;

       public EmpleadoController(EmpleadoData empleadoData)
       {
           _empleadoData = empleadoData;
       }

        //crearmos peticiones 
        [HttpGet]
        public async Task<IActionResult> Lista()
        {
            var empleados = await _empleadoData.Lista();
            return StatusCode(StatusCodes.Status200OK, empleados);
        }
    
        [HttpGet("{id}")]
        public async Task<IActionResult> Obtener(int id)
        {
            Empleado objeto = await _empleadoData.Obtener(id);
            return StatusCode(StatusCodes.Status200OK, objeto);
        }
        
        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Empleado empleado)//FromBody es para que el modelo se tome
        {
           bool respuesta = await _empleadoData.Crear(empleado);
           return StatusCode(StatusCodes.Status201Created, new {isSussess = respuesta});//  <--- Se modifica el retorno
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Empleado empleado)//FromBody es para que el modelo se tome
        {
           bool respuesta = await _empleadoData.Editar(empleado);
           return StatusCode(StatusCodes.Status201Created, new {isSussess = respuesta});//  <--- Se modifica el retorno
        }
    
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            bool respuesta = await _empleadoData.Eliminar(id);
            return StatusCode(StatusCodes.Status200OK, new {isSussess = respuesta});//  <--- Se modifica el retorno
        }
    
    }
}

 