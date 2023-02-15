import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4n0RWGA3_MZdhIlVAkty690PXJkzxgqY",
    authDomain: "headstarter-case.firebaseapp.com",
    projectId: "headstarter-case",
    storageBucket: "headstarter-case.appspot.com",
    messagingSenderId: "1087497436143",
    appId: "1:1087497436143:web:2d9db77041d85591a1d41a"
  };

const fire = firebase.initializeApp(firebaseConfig);



export default fire;