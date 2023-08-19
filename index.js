// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBHvuCxNIZ525B2fPIgTE23Z9A51YMZtlw",
    authDomain: "first-project-59564.firebaseapp.com",
    databaseURL: "https://first-project-59564-default-rtdb.firebaseio.com",
    projectId: "first-project-59564",
    storageBucket: "first-project-59564.appspot.com",
    messagingSenderId: "947027265089",
    appId: "1:947027265089:web:ab51a4f823f6ff2ade28c0",
    measurementId: "G-G536LP4MYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Initialize FireStore Database and get a reference to the service
const db = getFirestore(app);


var signNav = document.getElementById("goToAuth")
var signOutBtn = document.getElementById("signOut")

signNav.addEventListener("click", userSignPage)
signOutBtn.addEventListener("click", userSignOut)

// User state change 
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        // let goTo = window.location.href
        // if (!goTo.includes("account.html")) {
        //     setTimeout(() => {
        //         loader.classList.replace("d-block", "d-none")
        //         // window.location.href = goTo + "home/home.html"
        //     }, 3000);
        // } else {
        //     const userInfo = ref(database, 'appData/userInfo/' + uid);
        //     onValue(userInfo, (snapshot) => {
        //         const data = snapshot.val();
        //         accDisplayDetails(data)
        //     });

        // }

    } else {
        // User is signed out
    }
});

function userSignPage() {
    // let loc = window.location.href
    // window.location.href = loc.slice(0, loc.indexOf("index.html")) + "auth.html"
    window.location.href = "./auth.html"
}

// User sign out func
function userSignOut() {
    signOut(auth).then(() => {
        // let loc = window.location.href
        // window.location.href = loc.slice(0, loc.indexOf("index.html"))
        window.location.reload()
        // Sign-out successful.
    }).catch((error) => {
        console.log("logout error-->", error.message);
        // An error happened.
    });
}
