const argv = require('./config/yargs').argv;
var colors = require('colors');

const toDo = require('./todo/todo');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        console.log('Crear por hacer');
        let tarea = toDo.crear(argv.descripcion);

        console.log(tarea);
        break;
    case 'listar':
        let listado = toDo.getListado();
        for (let tarea of listado) {
            console.log('===========ToDo=============='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('============================='.green);
        }
        break;
    case 'actualizar':
        let actualizado = toDo.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = toDo.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:


}