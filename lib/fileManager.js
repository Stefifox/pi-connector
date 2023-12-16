const fs = require('fs')

const settings = require(`${process.cwd()}/settings.json`)

const basePath = process.cwd() + settings.files.default_path

function getFile(name) {
    return fs.readFileSync(`${basePath}/${name}`)
}

function uploadFile(blob, name){
    fs.writeFileSync(`${basePath}/${name}`, blob, 'base64')
}

async function getFiles(){
    return new Promise((resolve, reject)=>{
        fs.readdir(basePath, (err, files)=>{
            if(err)
                return reject(err)
            return resolve(files)
        })
    })
}

module.exports = {
    getFile,
    uploadFile,
    getFiles
}