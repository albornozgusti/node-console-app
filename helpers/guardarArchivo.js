const fs = require("fs");

const archivo = './db/data.json';

const guardarDB = (data)=>{

    fs.writeFileSync(archivo, JSON.stringify(data))
}

const leerDB = () => {

    if(!fs.existsSync(archivo)){
        return null;
    }

    const info = JSON.parse(fs.readFileSync(archivo, { encoding: 'utf8' }));
    console.log(info)
    return info
}

module.exports = {
    guardarDB,
    leerDB
}