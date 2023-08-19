// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, query, where } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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


var allBlogs = document.getElementById("allBlogs")
var allBlogBtn = document.getElementById("allBtn")
var userBlogs = document.getElementById("userBlogs")
var userBlogBtn = document.getElementById("userBtn")
var myBlogs = document.getElementById("myBlogs")
var myBlogBtn = document.getElementById("myBtn")
var publish = document.getElementById("publish")
var signNav = document.getElementById("goToAuth")
var signOutBtn = document.getElementById("signOut")

allBlogBtn.addEventListener("click", showAllBlogs)
// userBlogBtn.addEventListener("click", showUserBlogs)
// myBlogBtn.addEventListener("click", showMyBlogs)
publish.addEventListener("click", writeBlog)
signNav.addEventListener("click", userSignPage)
signOutBtn.addEventListener("click", userSignOut)

// User state change 
var uid = onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        return uid
        // let goTo = window.location.href

    } else {
        // User is signed out
    }
});


function showAllBlogs() {
    allBlogs.classList.remove("d-none")
    userBlogs.classList.add("d-none")
    myBlogs.classList.add("d-none")
}

function showUserBlogs() {
    userBlogs.classList.remove("d-none")
    allBlogs.classList.add("d-none")
    myBlogs.classList.add("d-none")
}

function showMyBlogs() {
    if (uid) {
        myBlogs.classList.remove("d-none")
        allBlogs.classList.add("d-none")
        userBlogs.classList.add("d-none")
    } else {
        window.location.href = "./auth.html"
    }
}

function writeBlog() {
    let blogTitle = document.getElementById("blogTitle")
    let blogContent = document.getElementById("blogContent")
    let valid = false
    switch (valid) {
        case blogTitle.checkValidity():
            blogTitle.reportValidity()
            break
        case blogContent.checkValidity():
            blogContent.reportValidity()
            break
        default:
            valid = true
    }
    if (!valid) {
        return null
    } else {
        (async function () {
            const q = query(collection(db, "users"), where("user_id", "==", uid));
            querySnapshot.forEach((doc) => {
                (async function () {
                    let [fname, lname] = [doc.data().first_name, doc.data().last_name]
                    try {
                        const docRefBlog = await addDoc(collection(db, "blogs"), {
                            user_id: uid,
                            user_name: `${fname} ${lname}`,
                            time: new Date().getTime(),
                            blogTitle,
                            blogContent
                        });
                        console.log("Document written with ID: ", docRefBlog.id);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })()
                console.log(doc.id, " => ", doc.data());
            });
        })()
    }

}

function userSignPage() {
    window.location.href = "./auth.html"
}

// User sign out func
function userSignOut() {
    signOut(auth).then(() => {
        window.location.reload()
        // Sign-out successful.
    }).catch((error) => {
        console.log("logout error-->", error.message);
        // An error happened.
    });
}
