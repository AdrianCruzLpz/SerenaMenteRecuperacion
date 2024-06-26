// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0kLe5l_gNuBwhkOOvBr8RO150dHCU31k",
  authDomain: "serena-mente.firebaseapp.com",
  projectId: "serena-mente",
  storageBucket: "serena-mente.appspot.com",
  messagingSenderId: "183868385167",
  appId: "1:183868385167:web:442b02f182fc8a28260dfa",
  measurementId: "G-LVWYEJBRHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar los elementos del formulario
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("pass");
  const loginButton = document.getElementById("Login");

  // Agregar evento de clic al botón de login
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    loginUser();
  });

  // Función para iniciar sesión
  async function loginUser() {
    try {
      // Obtener los valores del formulario
      const email = emailInput ? emailInput.value : "";
      const password = passwordInput ? passwordInput.value : "";

      // Iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert("Inicio de Sesión exitoso");
      window.location.href = "./recuperarDatos.html";
    
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al iniciar sesión:", errorCode, errorMessage);
      alert("Ocurrió un error al iniciar sesión: " + errorMessage);
    }
  }

  const olvidePassword = document.getElementById("olvide");
  olvidePassword.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("restorePass").style.display = "block";
    const resetPasswordInput = document.getElementById("resetPasswordInput");
    resetPasswordInput.addEventListener("input", function() {
      console.log("El valor ingresado es:", resetPasswordInput.value);
    });
  });
});

// Función para enviar correo de restablecimiento de contraseña
document.addEventListener("DOMContentLoaded", function () {
  const resetPasswordButton = document.getElementById("resetPasswordButton");
  resetPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();
    resetPassword();
  });

  async function resetPassword() {
    try {
      const resetPasswordInput = document.getElementById("resetPasswordInput");
      const email = resetPasswordInput ? resetPasswordInput.value : "";
      await sendPasswordResetEmail(auth, email);
      alert("Correo de restablecimiento de contraseña enviado");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al restablecer contraseña:", errorCode, errorMessage);
      alert("Ocurrió un error al restablecer la contraseña: " + errorMessage);
    }
  }
});