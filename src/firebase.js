//import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore,addDoc,collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
//import { getAnalytics } from "firebase/analytics";


/* const firebaseConfig={
  apikey:"AIzaSyCEy6YUeAvjOmRARvTRdfGel8RJDzs8U7A",
  authDomain:"netflix-clone-d1fa8.firebaseapp.com",
  projectId:"netflix-clone-d1fa8",
  storageBucket:"netflix-clone-d1fa8.appspot.com",
  messagingSenderId:"1080602120235",
  appId:"1:1080602120235:web:29e7c05415df6c1cd65a6e",
}; */
const firebaseConfig = {
  apiKey: "AIzaSyDB3ZQS0puf6zooQI1IggWeU6OgHgF6YSA",
  authDomain: "netflix-clone-59df0.firebaseapp.com",
  projectId: "netflix-clone-59df0",
  storageBucket: "netflix-clone-59df0.firebasestorage.app",
  messagingSenderId: "363353651873",
  appId: "1:363353651873:web:f81c8f51ddd2286b020ee0",
  measurementId: "G-WSYZLZGDMD"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
  try{
      const res=await createUserWithEmailAndPassword(auth,email,password);
      const user=res.user;
      await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
      });
  }
  catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
  
}
const login=async(email,password)=>{
  try{
      await signInWithEmailAndPassword(auth,email,password);
  }
  catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }

}

const logout=()=>{
  
  signOut(auth);
}

export {auth,db,login,signup,logout};
