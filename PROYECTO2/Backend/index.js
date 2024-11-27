
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const servidor = express();
const PUERTO = 5000;

servidor.use(bodyParser.json());
servidor.use(cors());
const FILENAME = 'Usuarios.json';
const FILENAME1 = 'Posts.json';



let dataStudents = [];
let dataPosts = [];



// Verificar y crear archivo si no existe
if (!fs.existsSync(FILENAME)) {
    fs.writeFileSync(FILENAME, JSON.stringify(dataStudents));
} else {
    const fileData = fs.readFileSync(FILENAME, 'utf8');
    dataStudents = JSON.parse(fileData);
}

// Función que ayuda a actualizar el contenido del archivo json
function updateDataFile() {
    fs.writeFileSync(FILENAME, JSON.stringify(dataStudents));
}



// Verificar y crear archivo si no existe
if (!fs.existsSync(FILENAME1)) {
    fs.writeFileSync(FILENAME1, JSON.stringify(dataPosts));
} else {
    const fileData = fs.readFileSync(FILENAME1, 'utf8');
    dataPosts = JSON.parse(fileData);
}

// Función que ayuda a actualizar el contenido del archivo json
function updateDataFile() {
    fs.writeFileSync(FILENAME1, JSON.stringify(dataPosts));
}


servidor.get("/", (req, res) => {
    let saludo = {
        Saludo: "Hola mundo!"
    };
    res.json(saludo);
});




servidor.get("/students", (req, res) => {
    res.json(dataStudents)
});

servidor.get("/obtainpost", (req, res) => {
    res.json(dataPosts)
});




servidor.get("/students/:carnet", (req, res) => {
    const carnet = req.params.carnet;
   const student = dataStudents.find(student => student.carnet === carnet);
    if (!student) {
        res.status(404).send({ response: 'Elemento no encontrado' });
    } else {
       res.json(student);
    }
});

// Endpoint en el cual guardamos un nuevo estudiante, la info se manda en el body en formato json
servidor.post("/students", (req, res) => {
    const newStudent = req.body;
   dataStudents.push(newStudent);
    res.status(201).send({ response: "Elemento creado correctamente." })
});


// Endpoint en el cual guardamos una nueva publicacion, la info se manda en el body en formato json
servidor.post("/creatPost", (req, res) => {
    const newPosts = req.body;
    const savePost = {
        id: (dataPosts.length +1),
        description: newPosts.description,
        codigo: newPosts.codigo,
        image: newPosts.image,
        name: newPosts.name,
        anonimo: newPosts.anonimo,
        fecha: newPosts.fecha,
        hora: newPosts.hora
    }

   dataPosts.push(savePost);
   updateDataFile1();
    res.status(201).send({ response: "publicacion creada correctamente." })
});


// Endpoint en el cual recibimos los datos del usuario que se quiere loggear, se valida si el usuario existe o no
// en el array de usuarios y también se valida que su password sea correcto
servidor.post('/login', (req, res) => {
    const data = req.body;
    console.log(data)
    const student = dataStudents.find(student => {
        console.log(student.carnet)
        console.log(student.password)
        if (student.carnet === data.carnet && student.password === data.password) {
            return student
        }
    });
    if (!student) {
        const response = {
            success: false,
            user: null
        }
        res.status(404).send(response);
    } else {
        const response = {
            success: true,
            user: student
        }
        res.json(response);
    }
});



// Endpoint con el cual actualizaremos los atributos de un objeto, menos su carnet
servidor.put("/students/:carnet", (req, res) => {
   const carnet = req.params.carnet;
    const updatedStudent = req.body;
    const index = dataStudents.findIndex(student => student.carnet === carnet);
    if (index === -1) {
        res.status(404).send({ response: 'Elemento no encontrado' });
    } else {
       dataStudents[index].nombre = updatedStudent.nombre;
        dataStudents[index].apellido = updatedStudent.apellido;
        dataStudents[index].edad = updatedStudent.edad;
        res.send({ response: 'Elemento actualizado correctamente' });
    }
});

// Endpoint con el cual se eliminar un estudiante en especifico
servidor.delete('/students/:carnet', (req, res) => {
   const carnet = req.params.carnet;
   const index = dataStudents.findIndex(student => student.carnet === carnet);
    if (index === -1) {
        res.status(404).send({response: 'Elemento no encontrado'});
    } else {
       dataStudents.splice(index, 1);
        res.send({response: 'Elemento eliminado correctamente'});
    }
});



// iniciar eñ servidor en el puerto especifico
servidor.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});