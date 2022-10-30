import {guardarEstudiante, 
    getEstudiante, 
    onGetEstudiantes, 
    guardarMatricula, 
    onGetMatriculas,
    onGetClases,
    guardarClase,
    deleteEstudiante,
    deleteMatricula,
    deleteClase,
    getClase,
    getMatricula,
    updateEstudiante,
    updateClase,
    updateMatricula
} from './firebase.js'

const EstudiantesContainer = document.getElementById('estudiantes-container')
const EstudianteForm = document.getElementById('Estudiante-form')

const MatriculaForm = document.getElementById('Matricula-form')
const MatriculasContainer = document.getElementById('matriculas-container')

const ClaseForm = document.getElementById('Clase-form')
const ClasesContainer = document.getElementById('clases-container')

let editStatusEstudiante = false;
let editStatusMatricula = false;
let editStatusClase = false;

let idEstudiante = ''
let idMatricula = ''
let idClase = ''

window.addEventListener('DOMContentLoaded', async () => {
    
    // Mostrar estudiantes
    onGetEstudiantes((estudiantes)=>{
        let html = '';
        
        estudiantes.forEach(doc => {
        const estudiante = doc.data()
        html += `
            <div class ="card card-body mt-3">
                <h4>Estudiante</h2>
                <h5>ID : ${estudiante.id}</h5>
                <p>Apellido: ${estudiante.apellido}</p>
                <p>Nombre: ${estudiante.nombre}</p>
                <div>
                    <button class="btn-delete mb-2" data-id="${doc.id}">Delete</button>
                    <button class="btn-edit" data-id="${doc.id}">Edit</button>
                </div>
            </div>
        `
        })

        EstudiantesContainer.innerHTML = html
        const btnsDeleteEstudiante = EstudiantesContainer.querySelectorAll('.btn-delete')

        //Borrar estudiante
        btnsDeleteEstudiante.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset }}) => {
                deleteEstudiante(dataset.id)
            })
        })

        const btnEditEstudiante = EstudiantesContainer.querySelectorAll('.btn-edit')

        // Editar estudiante
        btnEditEstudiante.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getEstudiante(e.target.dataset.id)
                const estudiante = doc.data()

                EstudianteForm['id-estudiante'].value = estudiante.id
                EstudianteForm['apellido-estudiante'].value = estudiante.apellido
                EstudianteForm['nombre-estudiante'].value = estudiante.nombre

                editStatusEstudiante = true
                idEstudiante = doc.id
                EstudianteForm['btn-estudiante-save'].innerText = 'Actualizar'
            })
        })
    })

    //Mostrar matriculas
    onGetMatriculas((matriculas)=>{
        let html = '';
        
        matriculas.forEach(doc => {
        const matricula = doc.data()
        html += `
            <div class ="card card-body mt-3">
                <h4>Matricula</h4>
                <h5>ID Matricula : ${matricula.id_matricula}</h5>
                <p>ID Clase: ${matricula.id_claseM}</p>
                <p>ID Estudiante: ${matricula.id_estudianteM}</p>
                <div>
                    <button class="btn-delete mb-2" data-id="${doc.id}">Delete</button>
                    <button class="btn-edit" data-id="${doc.id}">Edit</button>
                </div>
            </div>
        `
    })
    MatriculasContainer.innerHTML = html
    const btnsDeleteMatricula = MatriculasContainer.querySelectorAll('.btn-delete')

        //Borrar matriculas
        btnsDeleteMatricula.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset }}) => {
                deleteMatricula(dataset.id)
            })
        })

        const btnEditMatricula = MatriculasContainer.querySelectorAll('.btn-edit')

        // Editar matricula
        btnEditMatricula.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getMatricula(e.target.dataset.id)
                const matricula = doc.data()

                MatriculaForm['id-matricula'].value = matricula.id_matricula
                MatriculaForm['id-estudianteM'].value = matricula.id_estudianteM
                MatriculaForm['id-claseM'].value = matricula.id_claseM

                editStatusMatricula = true
                idMatricula = doc.id
                MatriculaForm['btn-matricula-save'].innerText = 'Actualizar'
            })
        })
    })

    //Mostrar clases
    onGetClases((clases)=>{
        let html = '';
        
        clases.forEach(doc => {
        const clase = doc.data()
        html += `
            <div class ="card card-body mt-3">
                <h4>Clase</h4>
                <h5>ID Clase : ${clase.id_clase}</h5>
                <p>Titulo: ${clase.titulo}</p>
                <p>Descripción: ${clase.descripcion}</p>
                <div>
                    <button class="btn-delete mb-2" data-id="${doc.id}">Delete</button>
                    <button class="btn-edit" data-id="${doc.id}">Edit</button>
                </div>
            </div>
        `
    })
    ClasesContainer.innerHTML = html
    const btnsDeleteClase = ClasesContainer.querySelectorAll('.btn-delete')

        //Borrar clase
        btnsDeleteClase.forEach(btn => {
            btn.addEventListener('click', ({target: { dataset }}) => {
                deleteClase(dataset.id)
            })
        })

        const btnEditClase = ClasesContainer.querySelectorAll('.btn-edit')

        // Editar clase
        btnEditClase.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getClase(e.target.dataset.id)
                const clase = doc.data()

                ClaseForm['id-clase'].value = clase.id_clase
                ClaseForm['titulo-clase'].value = clase.titulo
                ClaseForm['clase-description'].value = clase.descripcion

                editStatusClase = true
                idClase = doc.id
                ClaseForm['btn-clase-save'].innerText = 'Actualizar'
            })
        })
    })
})

//GUARDAR ESTUDIANTE
EstudianteForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const id_estudiante = EstudianteForm['id-estudiante']
    const apellido = EstudianteForm['apellido-estudiante']
    const nombre = EstudianteForm['nombre-estudiante']

    if (!editStatusEstudiante) {
        guardarEstudiante(parseInt(id_estudiante.value), apellido.value, nombre.value)
    } else {
        updateEstudiante(idEstudiante, {id : parseInt(id_estudiante.value), apellido : apellido.value,
                                        nombre: nombre.value})
        editStatusEstudiante = false
        EstudianteForm['btn-estudiante-save'].innerText = 'Guardar'
    }

    EstudianteForm.reset()
})

//GUARDAR MATRICULA
MatriculaForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const id_matricula = MatriculaForm['id-matricula']
    const id_estudianteM = MatriculaForm['id-estudianteM']
    const id_claseM = MatriculaForm['id-claseM']

    if (!editStatusMatricula) {
        guardarMatricula(parseInt(id_matricula.value), parseInt(id_estudianteM.value), id_claseM.value)
    } else {
        updateMatricula(idMatricula, {id_matricula : parseInt(id_matricula.value), id_estudianteM : parseInt(id_estudianteM.value),
                                        id_claseM: id_claseM.value})
        editStatusMatricula = false
        MatriculaForm['btn-matricula-save'].innerText = 'Guardar'
    }

    MatriculaForm.reset()
})

//GUARDAR CLASE
ClaseForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const id_clase = ClaseForm['id-clase']
    const titulo = ClaseForm['titulo-clase']
    const descripcion = ClaseForm['clase-description']

    if (!editStatusClase) {
        guardarClase(id_clase.value, titulo.value, descripcion.value)
    } else {
        updateClase(idClase, {id_clase : id_clase.value, descripcion : descripcion.value,
                                        titulo: titulo.value})
            editStatusClase = false
            ClaseForm['btn-clase-save'].innerText = 'Guardar'
    }

    ClaseForm.reset()
})