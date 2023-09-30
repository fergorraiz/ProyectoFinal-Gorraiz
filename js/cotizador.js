class Aseguradora {
    constructor(nombre) {
        this.nombre = nombre.toUpperCase();
        this.vehiculos = [];
        this.planes = [];
    }
    agregarVehiculo(vehiculos) {
        this.vehiculos.push(vehiculos);
    }
    agregarPlan(plan) {
        this.vehiculos.push(plan);
    }

    get vehiculosActivos() {
        return this.vehiculos.filter(vehiculo => vehiculo.activo == true)
    }
}

class Plan {

    constructor(nombre, precio, bonificacion) {
        this.nombre = nombre.toUpperCase();
        this.precioBase = parseFloat(precio);
        this.bonificacion = parseFloat(bonificacion);
    }
}

class Vehiculo {
    constructor(marca, modelo) {
        this.marca = marca.toUpperCase();
        this.modelo = modelo.toUpperCase();
        this.activo = true;
    }

    actualizarEstado(estado) {
        this.activo = estado;
    }
}

function eliminarDuplicados(array) {
    const vehiculosUnicos = [];
    const marcasYModelosVistos = new Set();

    for (const vehiculo of array) {
        const clave = vehiculo.marca + vehiculo.modelo;

        if (!marcasYModelosVistos.has(clave)) {
            marcasYModelosVistos.add(clave);
            vehiculosUnicos.push(vehiculo);
        }
    }

    return vehiculosUnicos;
}

function generarVehiculos() {
    // Array de marcas y modelos disponibles
    const marcasDisponibles = ["VOLKSWAGEN", "FORD", "TOYOTA", "FIAT", "RENAULT", "CHEVROLET"];
    const modelosPorMarca = {
        "VOLKSWAGEN": ["AMAROK", "GOLF", "JETTA", "POLO"],
        "FORD": ["FOCUS", "FIESTA", "RANGER", "ESCAPE"],
        "TOYOTA": ["COROLLA", "CAMRY", "RAV4", "HILUX"],
        "FIAT": ["500", "PANDA", "TIPO", "DOBLO"],
        "RENAULT": ["CLIO", "MEGANE", "KADJAR", "DUSTER"],
        "CHEVROLET": ["CRUZE", "SPARK", "EQUINOX", "SILVERADO"]
    };
    // Arreglo para almacenar los objetos generados
    const vehiculos = [];
    // Generar 30 objetos diferentes
    for (let i = 0; i < 30; i++) {
        // Elegir una marca aleatoria de la lista de marcas disponibles
        const marcaAleatoria = marcasDisponibles[Math.floor(Math.random() * marcasDisponibles.length)];

        // Elegir un modelo aleatorio correspondiente a la marca
        const modelosDeMarca = modelosPorMarca[marcaAleatoria];
        const modeloAleatorio = modelosDeMarca[Math.floor(Math.random() * modelosDeMarca.length)];

        // Crear un objeto con la marca y el modelo aleatorio
        const nuevoVehiculo = new Vehiculo(marcaAleatoria, modeloAleatorio);

        // Agregar el objeto al arreglo
        vehiculos.push(nuevoVehiculo);
    }
    return eliminarDuplicados(vehiculos);
}

function cotizarVehiculo(marca, modelo, year) {
    const resultadoCotizacion = [];
    const lv_anio_actual = new Date().getFullYear();
    const lv_descuentoPorAnio = 4800;
    const lv_marca = marca.toUpperCase();
    const lv_modelo = modelo.toUpperCase();
    const lv_year = parseInt(year);

    if (lv_year < 2000) //No cotizamos vehiculos anteriores al año 2000
    {
        alert("Lo sentimos pero su vehiculo no está dentro de nuestro rango de cotización, solo cotizamos vehiculos superiores al año 2000.");

    }
    else if (lv_year <= lv_anio_actual) {
        const resultado = aseguradora.vehiculos.filter(vehiculos => {
            return vehiculos.marca === lv_marca && vehiculos.modelo === lv_modelo && vehiculos.activo == true;
        })
        const descuentoAntiguedad = (lv_anio_actual - lv_year) * lv_descuentoPorAnio / 100;

        for (let i = 0; i < resultado.length; i++) {
            for (let j = 0; j < aseguradora.planes.length; j++) {

                let cotizacion = (aseguradora.planes[j].precioBase - descuentoAntiguedad) - (aseguradora.planes[j].precioBase * aseguradora.planes[j].bonificacion / 100);

                resultadoCotizacion.push(
                    {
                        plan: aseguradora.planes[j].nombre,
                        marca: resultado[i].marca,
                        modelo: resultado[i].modelo,
                        year: lv_year,
                        cotizacion: cotizacion,
                        bonificacion: aseguradora.planes[j].bonificacion,
                    }
                )
            }
        }
    }
    else {
        alert("El año del vehiculo no puede ser superior al año actual.");

    }
    //evitamos retornar basura
    return resultadoCotizacion.filter(vehiculo => vehiculo !== undefined);;


}

const aseguradora = new Aseguradora('CotizaPro');
aseguradora.vehiculos = generarVehiculos();

console.log('Aseguradora ' + aseguradora.nombre);

aseguradora.vehiculos[3].actualizarEstado(false);

console.log('Nuestras cotizaciones disponibles:');
console.log(aseguradora.vehiculosActivos);

aseguradora.planes.push(new Plan('BRONCE', '15000', '10'));
aseguradora.planes.push(new Plan('SILVER', '45000', '20'));
aseguradora.planes.push(new Plan('GOLD', '70000', '30'));

let vehiculosCotizados = [];
let marca = prompt("Ingrese la marca de su vehículo");
let modelo = prompt("Ingrese la modelo de su vehículo");
let year = prompt("Ingrese el año de su vehículo");
let cotizar;
if (marca.length == 0 && modelo.length == 0 && year.length == 0) {
    alert("Los campos marca, modelo, año son obligatorios.");
    cotizar = false;
}
else {
    cotizar = true;
}

while (cotizar) {

    if (marca.length == 0 && modelo.length == 0 && year.length == 0) {
        alert("Los campos marca, modelo, año son obligatorios.");
        cotizar = false;
    } else {
        const resultadoCotizacion = cotizarVehiculo(marca, modelo, year);
        //¿por qué no puedo hacer vehiculosCotizados.push para luego mostrar los valores?
        vehiculosCotizados = vehiculosCotizados.concat(resultadoCotizacion);

    }

    let lv_cotiza = prompt("Desea cotizar otro vehiculo? Y/N");
    lv_cotiza = lv_cotiza.toUpperCase();
    switch (lv_cotiza) {
        case 'Y':
            cotizar = true;
            marca = prompt("Ingrese la marca de su vehículo");
            modelo = prompt("Ingrese la modelo de su vehículo");
            year = prompt("Ingrese el año de su vehículo");
            break;
        case 'N':
            cotizar = false;
        default:
            cotizar = false;
            break;
    }

}

if (vehiculosCotizados.length > 0) {
    let totalCotizados;
    let contador = 0;
    if (aseguradora.planes.length > 0) {
        totalCotizados = parseInt(vehiculosCotizados.length / aseguradora.planes.length);    
    }    
    
    if (contador == 1) {
        console.log("Usted cotizó " + totalCotizados + " vehiculo");
    }
    else {
        console.log("Usted cotizó " + totalCotizados + " vehiculos");
    }

    vehiculosCotizados.forEach(vehiculo => {

        if (contador == 0) {
            console.log("---------------------------------------------------------");
            console.log(`Marca: ${vehiculo.marca}, Modelo: ${vehiculo.modelo}, Año: ${vehiculo.year}`);
        }
        console.log(`Plan: ${vehiculo.plan}, Cotización: $${vehiculo.cotizacion}, Bonificación: ${vehiculo.bonificacion}%`);

        if (contador == aseguradora.planes.length - 1) {
            console.log("---------------------------------------------------------");
            contador = 0;
        }
        else { contador = contador + 1; }
    });

}
else {
    console.log("No se encontraron cotizaciones para los parametros ingresados. Por favor, vuelva a intentarlo.");
}
