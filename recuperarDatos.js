import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, reload, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0kLe5l_gNuBwhkOOvBr8RO150dHCU31k",
  authDomain: "serena-mente.firebaseapp.com",
  projectId: "serena-mente",
  storageBucket: "serena-mente.appspot.com",
  messagingSenderId: "183868385167",
  appId: "1:183868385167:web:442b02f182fc8a28260dfa",
  measurementId: "G-LVWYEJBRHE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const user = auth.currentUser;

document.addEventListener("DOMContentLoaded", function() {
  const nameInput = document.getElementById("name");
  const lastnameInput = document.getElementById("lastname");
  const ageInput = document.getElementById("edad");
  const civilStatusInput = document.querySelector('select[name="estado_civil"]');
  const genderInputs = document.querySelectorAll('input[name="sexo"]');
  const occupationInput = document.querySelector('select[name="ocupacion"]');
  const educationLevelInput = document.querySelector('select[name="nivel_estudios"]');
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  /*const passwordInput = document.getElementById("pass");
  const confirmPasswordInput = document.getElementById("confirPass");*/
  const signUpButton = document.getElementById("signUp");

  signUpButton.addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
  });

  async function registerUser() {
    try {
      const nombre = nameInput ? nameInput.value : "";
      const apellido = lastnameInput ? lastnameInput.value : "";
      const edad = ageInput ? parseInt(ageInput.value) : 0;

      const estadoCivil = civilStatusInput ? civilStatusInput.value : "";
      const ocupacion = occupationInput ? occupationInput.value : "";
      const educacion = educationLevelInput ? educationLevelInput.value : "";
      const number = phoneInput ? phoneInput.value : "";

      let genero = "";
      genderInputs.forEach((input) => {
        if (input.checked) {
          genero = input.value;
        }
      });
      
      const email = emailInput ? emailInput.value : "";
      /*const password = passwordInput ? passwordInput.value : "";
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";*/

      /*if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }*/

      /*const userCredential = await createUserWithEmailAndPassword(auth, email);
      const user = userCredential.user;*/

      const currentUser = await auth.currentUser;

      /*await sendEmailVerification(user);
      alert("Se ha enviado un correo de verificación a tu cuenta de email.");

      let verificationInterval;
      verificationInterval = setInterval(async () => {
        await reload(user);
        if (user.emailVerified) {
          clearInterval(verificationInterval);

          try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Sesión iniciada correctamente");
            window.location.href = "./evaluacionPrevia.html";
          } catch (error) {
            alert("Error al iniciar sesión: " + error.message);
          }
        }
      }, 5000);*/

      await setDoc(doc(db, "usuarios", currentUser.uid), {
        nombre,
        apellido,
        edad,
        estadoCivil,
        genero,
        ocupacion,
        educacion,
        number,
        email,
      });

      /*await setDoc(doc(db, "evaluacionRealizada", user.uid), {
        evaluacionPreviaRealizada: false,
      });*/

      alert("Datos registrados correctamente");
      window.location.href = "./agradecimiento.html";

    } catch (error) {
      console.error("Error al recuperar los datos del usuario:", error.code, error.message);
      alert("Ocurrió un error al recuperar los datos del usuario: " + error.message);
    }
  }
});