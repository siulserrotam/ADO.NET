using ApiAdo.Data;

var builder = WebApplication.CreateBuilder(args);


// Agregar servicios al contenedor.
builder.Services.AddControllers();  // Importante para los controladores
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();   // Agrega Swagger

builder.Services.AddSingleton<EmpleadoData>(); // Inyección de dependencias para EmpleadoData

var app = builder.Build();

// Configurar el pipeline de solicitudes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usa los controladores API
app.MapControllers();  // Esto mapea todos los controladores de la aplicación

app.Run();
