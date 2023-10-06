class Paciente 
{
    constructor(nombre, edad, genero, telefono, diagnostico) 
    {
        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero;
        this.telefono = telefono;
        this.diagnostico = diagnostico;
    }
}

class RegistroPacientes 
{
    constructor() 
    {
        this.pacientes = [];
    }

    agregarPaciente(paciente) 
    {
        this.pacientes.push(paciente);
    }

    buscarPorNombreRecursivo(nombre, index = 0, resultados = []) 
    {
        if (index >= this.pacientes.length) 
        {
            return resultados;
        }

        if (this.pacientes[index].nombre.includes(nombre)) 
        {
            resultados.push(this.pacientes[index]);
        }

        return this.buscarPorNombreRecursivo(nombre, index + 1, resultados);
    }

    buscarPorNombre(nombre) 
    {
        return this.buscarPorNombreRecursivo(nombre);
    }

    buscarPorDiagnosticoRecursivo(diagnostico, index = 0, resultados = []) 
    {
        if (index >= this.pacientes.length) 
        {
            return resultados;
        }

        if (this.pacientes[index].diagnostico.includes(diagnostico)) 
        {
            resultados.push(this.pacientes[index]);
        }

        return this.buscarPorDiagnosticoRecursivo(diagnostico, index + 1, resultados);
    }

    buscarPorDiagnostico(diagnostico) 
    {
        return this.buscarPorDiagnosticoRecursivo(diagnostico);
    }

    eliminarPaciente(nombre) 
    {
        this.pacientes = this.pacientes.filter(paciente => paciente.nombre !== nombre);
    }

    calcularEdadPromedio() 
    {
        if (this.pacientes.length === 0) return 0;

        const sumaEdades = this.pacientes.reduce((total, paciente) => total + paciente.edad, 0);
        return sumaEdades / this.pacientes.length;
    }

    obtenerNumeroTotalPacientes() {
        return this.pacientes.length;
    }
}

const registro = new RegistroPacientes();

function agregarPaciente() 
{
    const nombreInput = document.getElementById("nombre");
    const edadInput = document.getElementById("edad");
    const generoInput = document.getElementById("genero");
    const telefonoInput = document.getElementById("telefono");
    const diagnosticoInput = document.getElementById("diagnostico");

    const nombre = nombreInput.value;
    const edad = parseInt(edadInput.value);
    const genero = generoInput.value;
    const telefono = telefonoInput.value;
    const diagnostico = diagnosticoInput.value;

    if (nombre && !isNaN(edad) && genero && telefono && diagnostico) 
    {
        const paciente = new Paciente(nombre, edad, genero, telefono, diagnostico);
        registro.agregarPaciente(paciente);
        actualizarListaPacientes();
        actualizarEstadisticas();

        // Limpiar los campos de entrada después de agregar un paciente
        nombreInput.value = "";
        edadInput.value = "";
        generoInput.value = "";
        telefonoInput.value = "";
        diagnosticoInput.value = "";
    } 
    
    else 
    {
        alert("Por favor, complete todos los campos antes de agregar un paciente.");
    }
}

function buscarPorNombre() 
{
    const nombreInput = document.getElementById("buscar-nombre");
    const nombre = nombreInput.value;
    const pacientesEncontrados = registro.buscarPorNombre(nombre);
    mostrarPacientes(pacientesEncontrados);

    nombreInput.value = "";
}

function buscarPorDiagnostico() 
{
    const diagnosticoInput = document.getElementById("buscar-diagnostico");
    const diagnostico = diagnosticoInput.value;
    const pacientesEncontrados = registro.buscarPorDiagnostico(diagnostico);
    mostrarPacientes(pacientesEncontrados);

    diagnosticoInput.value = "";
}

function eliminarPaciente(nombre) 
{
    registro.eliminarPaciente(nombre);
    actualizarListaPacientes();
    actualizarEstadisticas();
}

function mostrarPacientes(pacientes) 
{
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    pacientes.forEach(paciente => {
        const item = document.createElement("li");
        item.textContent = `Nombre: ${paciente.nombre} Edad: ${paciente.edad} Diagnostico: ${paciente.diagnostico}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => eliminarPaciente(paciente.nombre);
        item.appendChild(deleteButton);
        lista.appendChild(item);
    });
}

function actualizarListaPacientes() 
{
    mostrarPacientes(registro.pacientes);
}

function actualizarEstadisticas() 
{
    document.getElementById("total-pacientes").textContent = registro.obtenerNumeroTotalPacientes();
    document.getElementById("edad-promedio").textContent = registro.calcularEdadPromedio();
}
