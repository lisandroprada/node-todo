const fs = require('fs');
const { gainsboro } = require('color-name');


let listadoToDo = [];

const guardarDB = () => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify(listadoToDo);
        fs.writeFile('./data/data.json', data, (err) => {
            if (err) reject(err)
            else
                resolve('Base actualizada');
        });
    })
}

const leerDB = () => {

    try {
        listadoToDo = require('../data/data.json');
    } catch (error) {
        listadoToDo = [];
    }
}

const crear = (descripcion) => {
    leerDB();
    let toDo = {
        descripcion: descripcion,
        completado: false
    };

    listadoToDo.push(toDo);
    guardarDB().then(resp => {
        console.log(resp);
    });
    return toDo;
}

const getListado = () => {
    leerDB();
    return listadoToDo;
}

const actualizar = (descripcion, completado = true) => {
    leerDB();

    let index = listadoToDo.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    leerDB();

    // let index = listadoToDo.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // })

    // if (index >= 0) {
    //     console.log(index);
    //     listadoToDo.splice(index, index);
    //     guardarDB();
    //     return 'Registro eliminado';
    // } else {
    //     return false;
    // }

    let nuevoListado = listadoToDo.filter(tarea => {
        return tarea.descripcion !== descripcion;
    })

    if (listadoToDo.length === nuevoListado.length) {
        return false;
    } else {
        listadoToDo = nuevoListado;
        guardarDB();
        return 'Registro eliminado';
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}