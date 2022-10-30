
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, 
    collection, 
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    doc,
    getDoc,
    updateDoc 
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4-we94lBbdZpjD4TJkEW4QGYZl1yzWpQ",
    authDomain: "reto-final-crud.firebaseapp.com",
    projectId: "reto-final-crud",
    storageBucket: "reto-final-crud.appspot.com",
    messagingSenderId: "55459562258",
    appId: "1:55459562258:web:6f9c3a137359fe6d57a9cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// Estudiante

export const guardarEstudiante = (id, apellido, nombre) => {
    addDoc(collection(db, 'Estudiantes'), {id, apellido, nombre});
}
 
export const getEstudiantes = () => getDocs(collection(db, 'Estudiantes'))

export const onGetEstudiantes = (funcion) => onSnapshot(collection(db, 'Estudiantes'), funcion)

export const deleteEstudiante = (id) => deleteDoc(doc(db, 'Estudiantes', id))

export const getEstudiante = id => getDoc(doc(db, 'Estudiantes', id))

export const updateEstudiante = (id, nuevosDatos) => updateDoc(doc(db, 'Estudiantes', id), nuevosDatos)

// Matricula

export const guardarMatricula = (id_matricula, id_estudianteM, id_claseM) => {
    addDoc(collection(db, 'Matriculas'), {id_matricula, id_estudianteM, id_claseM});
}

export const onGetMatriculas = (funcion) => onSnapshot(collection(db, 'Matriculas'), funcion)

export const deleteMatricula = (id) => deleteDoc(doc(db, 'Matriculas', id))

export const getMatricula = id => getDoc(doc(db, 'Matriculas', id))

export const updateMatricula = (id, nuevosDatos) => updateDoc(doc(db, 'Matriculas', id), nuevosDatos)

//Clase

export const guardarClase = (id_clase, titulo, descripcion) => {
    addDoc(collection(db, 'Clases'), {id_clase, titulo, descripcion})
}

export const onGetClases = (funcion) => onSnapshot(collection(db, 'Clases'), funcion)

export const deleteClase = (id) => deleteDoc(doc(db, 'Clases', id))

export const getClase = id => getDoc(doc(db, 'Clases', id))

export const updateClase = (id, nuevosDatos) => updateDoc(doc(db, 'Clases', id), nuevosDatos)