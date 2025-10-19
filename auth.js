// ✅ auth.js - Control global de sesión

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBt48uLSA1IhO36jXTbdOh7o-O8zQ2VAQ4",
      authDomain: "roca-fuerte-79965.firebaseapp.com",
      projectId: "roca-fuerte-79965",
      storageBucket: "roca-fuerte-79965.firebasestorage.app",
      messagingSenderId: "997970282203",
      appId: "1:997970282203:web:e2dcb13d7be47d753eeefe"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🧠 Mantener sesión activa globalmente
export function watchAuthStatus(callback) {
  // Si ya hay sesión en localStorage
  const localUser = JSON.parse(localStorage.getItem("user"));
  if (localUser) callback(localUser);

  // Escuchar cambios de Firebase
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = { uid: user.uid, email: user.email };
      localStorage.setItem("user", JSON.stringify(userData));
      callback(userData);
    } else {
      localStorage.removeItem("user");
      callback(null);
    }
  });
}

// ✅ Obtener usuario actual sincronizado
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// ✅ Cerrar sesión globalmente
export async function logout() {
  await auth.signOut();
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
