// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnSAUDBaTQQJdcgtu9MFZ2Xpr3oOKNdqw",
  authDomain: "prueba2-31849.firebaseapp.com",
  databaseURL: "https://prueba2-31849-default-rtdb.firebaseio.com",
  projectId: "prueba2-31849",
  storageBucket: "prueba2-31849.appspot.com",
  messagingSenderId: "593735540788",
  appId: "1:593735540788:web:4fa918ce020f5050c66a61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkActiveSession();
  });

  // Función para verificar si hay una sesión activa
  async function checkActiveSession() {
    try {
      const currentUser = await auth.currentUser;
      if (currentUser) {
        //alert("Usuario activo: " + currentUser.email);
        logoutUser();
      } else {
        alert("No hay una sesión activa");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al verificar la sesión:", errorCode, errorMessage);
      alert("Ocurrió un error al verificar la sesión: " + errorMessage);
    }
  }

  // Función para cerrar sesión
  async function logoutUser() {
    try {
      await signOut(auth);
      alert("Cerrar sesión exitoso");
      window.location.href = 'https://serenamente.iztacala.unam.mx/';
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al cerrar sesión:", errorCode, errorMessage);
      alert("Ocurrió un error al cerrar sesión: " + errorMessage);
    }
  }
});