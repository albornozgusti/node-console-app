require('colors');

const {
    mostrarMenu,
    pausa,
 } = require('./helpers/mensajes');
const {
    inquirerMenu,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckbox
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

console.clear();

const main = async()=> {
    let opt ='';

    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                const desc = await leerInput('Descripcion: ');
                console.log(desc);
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listadoPendientesCompletadas();
                break;
            case '4':
                tareas.listadoPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckbox(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== 0) {
                    const ok = await confirmar('¿Esta seguro?');
                    console.log({ok});
                    if ( ok ){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada!')
                    }
                }
                break;
            case '0':
                console.clear();
                break;
            default:
                console.log('opción no valida');
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    
    }while(opt !== '0');
    //pausa();
}

main();