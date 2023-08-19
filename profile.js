// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, query, where, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

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
// const storage = getStorage(app);
// const storageRef = ref(storage, `images${localStorage.getItem("uid")}/pic.jpg`);


// User state change 
onAuthStateChanged(auth, (user) => {
    if (user) {
        currUser.classList.remove("d-none")
        signNav.classList.add("d-none")
        // User is signed in, see docs for a list of available properties
        var uid = user.uid;
        localStorage.setItem("uid", uid);
        (async () => {
            const q = query(collection(db, "users"), where("user_id", "==", uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                currUser.textContent = `${doc.data().first_name} ${doc.data().last_name}`
                accFname.value = doc.data().first_name
                accLname.value = doc.data().last_name
                // getDownloadURL(ref(storage, `images/${uid}/`))
                //     .then((url) => {
                //         // `url` is the download URL for 'images/stars.jpg'

                //         // This can be downloaded directly:
                //         const xhr = new XMLHttpRequest();
                //         xhr.responseType = 'blob';
                //         xhr.onload = (event) => {
                //             const blob = xhr.response;
                //         };
                //         xhr.open('GET', url);
                //         xhr.send();
                //         avatar.setAttribute('src', url);
                //     })
                //     .catch((error) => {
                //     });
            });
        })()
    } else {
        signNav.classList.remove("d-none")
        currUser.classList.add("d-none")
        // User is signed out
    }
});


var currUser = document.getElementById("currUser")
var allBlogs = document.getElementById("allBlogs")
var allBlogBtn = document.getElementById("allBtn")
var allBlogContainer = document.getElementById("allBlogContainer")
var userBlogs = document.getElementById("userBlogs")
var userBlogContainer = document.getElementById("userBlogContainer")
var user = document.getElementById("user")
var backToAll = document.getElementById("backToAll")
var myBlogs = document.getElementById("myBlogs")
var myBlogBtn = document.getElementById("myBtn")
var myBlogContainer = document.getElementById("myBlogContainer")
var blogTitle = document.getElementById("blogTitle")
var TitleCount = document.getElementById("titleChCount")
var blogContent = document.getElementById("blogContent")
var ContentCount = document.getElementById("ContentChCount")
var publish = document.getElementById("publish")
var cancelBlog = document.getElementById("cancel")
var updateflag = [false, null]
var signNav = document.getElementById("goToAuth")
var signOutBtn = document.getElementById("signOut")

// ACCOUNT PAGE
var accFname = document.getElementById("fName")
var accLname = document.getElementById("lName")
var pass = document.getElementById("pass")
var avatar = document.getElementById("ava")
// var imgIn = document.getElementById("imgIn")
// imgIn.addEventListener("change", () => {
//     imgIn.files[0].name = 'pic.jpg'
//     openFile()
// });

// var openFile = function (file) {
//     var input = file.target;
//     var reader = new FileReader();
//     reader.onload = function () {
//         var dataURL = reader.result;
//         uploadBytes(storageRef, dataURL).then((snapshot) => {
//             console.log('Uploaded a blob or file!');
//         });
//     };
//     reader.readAsDataURL(input.files[0]);
// };



signNav.addEventListener("click", userSignPage)
signOutBtn.addEventListener("click", userSignOut)



function userSignPage() {
    window.location.href = "./auth.html"
}

// User sign out func
function userSignOut() {
    signOut(auth).then(() => {
        localStorage.removeItem("uid")
        window.location.reload()
        // Sign-out successful.
    }).catch((error) => {
        console.log("logout error-->", error.message);
        // An error happened.
    });
}
