const inquirer = require('inquirer');
require('colors');



const inquirerMenu = async()=>{

    const menuOptions = [
        {
            type: 'list',
            name: 'option',
            message: '¿Que desea hacer?',
            choices: [
                {
                    name: `${'1.'.green} Crear Tarea`,
                    value: '1'
                },
                {
                    name: `${'2.'.green} Listar Tarea`,
                    value: '2'
                },
                {
                    name: `${'3.'.green} Listar Tareas completadas`,
                    value: '3'
                },
                {
                    name: `${'4.'.green} Listar Tarea pendientes`,
                    value: '4'
                },
                {
                    name: `${'5.'.green} Completar Tarea(s)`,
                    value: '5'
                },
                {
                    name: `${'6.'.green} Borrar tarea`,
                    value: '6'
                },
                {
                    name: `${'0.'.green} Salir`,
                    value: '0'
                }
            ]
        }
    ]

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opcion'.green);
    console.log('=========================\n'.green);
    
    const {option} = await inquirer.prompt(menuOptions);
    return option;
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'option',
            message,
            validate(value){
                if (value.length === 0){
                    return 'por favor ingrese un valor'
                }
                return true;
            }
        }
    ]

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opcion'.green);
    console.log('=========================\n'.green);
    
    const {option} = await inquirer.prompt(question);
    return option;
}

const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        
        const idx = `${i+1}. `.green;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift( {
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const preguntas = [
        {
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }
]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckbox = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        
        const idx = `${i+1}. `.green;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckbox
}