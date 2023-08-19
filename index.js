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
var myblogContainer = document.getElementById("myblogContainer")
var publish = document.getElementById("publish")
var signNav = document.getElementById("goToAuth")
var signOutBtn = document.getElementById("signOut")

allBlogBtn.addEventListener("click", showAllBlogs)
// userBlogBtn.addEventListener("click", showUserBlogs)
myBlogBtn.addEventListener("click", showMyBlogs)
publish.addEventListener("click", writeBlog)
signNav.addEventListener("click", userSignPage)
signOutBtn.addEventListener("click", userSignOut)

// User state change 
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        var uid = user.uid;
        localStorage.setItem("uid", uid)
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

async function showMyBlogs() {
    let userId = localStorage.getItem("uid")
    if (userId) {
        myBlogs.classList.remove("d-none")
        allBlogs.classList.add("d-none")
        userBlogs.classList.add("d-none")
        myblogContainer.innerHTML = null
        const q = query(collection(db, "blogs"), where("user_id", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            let blog = `<div class="bg-body-tertiary border border-white rounded shadow-lg p-3 my-3">
							<div class="d-flex mb-3">
								<div
									class="mx-2 profImg rounded overflow-hidden border border-4 border-light-subtle shadow">
									<img class="img-fluid" src="${''}./static/prof.jpg" alt="">
								</div>
								<div class="d-flex flex-column align-self-end ms-3">
									<div class="fs-3 fw-semibold ">${data.blogTitle}</div>
									<div class="text-body-secondary">${data.user_name}-${new Date(data.time).toLocaleDateString()}</div>
								</div>
							</div>
							<div class=" my-2">${data.blogContent}</div>
						</div>`
            myblogContainer.innerHTML += blog
        });

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
            let userId = localStorage.getItem("uid");
            const q = query(collection(db, "users"), where("user_id", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                (async function () {
                    let [fname, lname] = [doc.data().first_name, doc.data().last_name]
                    try {
                        const docRefBlog = await addDoc(collection(db, "blogs"), {
                            user_id: userId,
                            user_name: `${fname} ${lname}`,
                            time: new Date().getTime(),
                            blogTitle: blogTitle.value,
                            blogContent: blogContent.value
                        });
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })()
            });
        })()
        blogTitle.value = null
        blogContent.value = null
    }
}

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
