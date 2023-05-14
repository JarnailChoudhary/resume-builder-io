import './App.css';
import db from './firebase-setup/firebase.js'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Header from './components/header/Header';
import Resume from './pages/resume/Resume';
import { useState, useEffect, useRef } from 'react';
import ResumeCollections from './pages/resumemain/ResumeCollections';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home  from './pages/home/Home';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';


function App() {
  const dwnldRef = useRef(null)
  const [loggedUser, setLoggedUser] = useState(null)

  // google login
  const provider = new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        const user = result.user;
        setLoggedUser(user)

      }).catch((error) => {
        console.log(error)
      });
  }
  // facebook login
  const fbsignin = () => {
    console.log("fb login")
  }

  // add user logged in details
  useEffect(() => {
    async function addDetails() {
      if (loggedUser) {
        const userEmail = loggedUser.email
        try {
          // Add a new document in collection "users"
          await setDoc(doc(db, "users", userEmail), {
            name: loggedUser.displayName,
            username: "",
            email: loggedUser.email
          });
        } catch (e) {
          console.log(e)
        }

        // user-details
        try {
          const detailDocRef = doc(db, "user-details", userEmail)
          const allDataCheck = await getDoc(detailDocRef)
          if (allDataCheck.exists() === false || detailDocRef.id !== userEmail) {
            await setDoc(detailDocRef, {
              resumecollectionall: []
            });
          }
        } catch (e) {
          console.log(e)
        }

        // resume-collection
        // user-details
        try {
          const detailDocRef = doc(db, "resumecollections", userEmail)
          const allDataCheck = await getDoc(detailDocRef)
          if (allDataCheck.exists() === false || detailDocRef.id !== userEmail) {
            await setDoc(detailDocRef, {
              resumelist: []
            });
          }
        } catch (e) {
          console.log(e)
        }
        // 
      }
    }
    addDetails()

  }, [loggedUser])

  // signout
  const auth = getAuth();
  const handlesignout = async () => {
    await signOut(auth).then(() => {
      setLoggedUser(null)
    }).catch((error) => {
      console.log(error)
    });
  }
  // 

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // on resize
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Header signIn={signIn} handlesignout={handlesignout} /> 
      <Home />
      </>,
    },
    {
      path: "/about",
      element: <><Header signIn={signIn} handlesignout={handlesignout} /> 
      <About />
      </>,
    },
    {
      path: "/resume",
      element: <><Header signIn={signIn} handlesignout={handlesignout} /> 
      <ResumeCollections />
      </>,
      errorElement: <div>Error</div>,
    },
    {
      path: "resume/:ResumeId",
      element: <>
      <Header />
      <Resume signIn={signIn} fbsignin={fbsignin} dref={dwnldRef}/>
      </>,
    },
    {
      path: "/contact",
      element: <><Header signIn={signIn} handlesignout={handlesignout} /> 
      <Contact />
      </>,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
