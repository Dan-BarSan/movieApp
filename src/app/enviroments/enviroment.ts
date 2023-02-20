import { initializeApp } from "firebase/app";

//Firebase configuration
/*
const firebaseConfig = {

    apiKey: "AIzaSyCxs-JUWgHfksui9o-jL_4EDFssyVL1OrM",  
    authDomain: "movieapp-db-c0c0c.firebaseapp.com",  
    projectId: "movieapp-db-c0c0c",  
    storageBucket: "movieapp-db-c0c0c.appspot.com",  
    messagingSenderId: "384670622514",  
    appId: "1:384670622514:web:8ca2d32d2001c53f05ed2b"
  
  };*/

  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);

  export const environment = {
    production: false,
    apiUrl:"https://localhost:7033/api",
    firebaseConfig: {
      apiKey: "AIzaSyCxs-JUWgHfksui9o-jL_4EDFssyVL1OrM",
      authDomain: "movieapp-db-c0c0c.firebaseapp.com",
      databaseURL: "1:384670622514:web:8ca2d32d2001c53f05ed2b", //Check later
      projectId: "movieapp-db-c0c0c",
      storageBucket: "movieapp-db-c0c0c.appspot.com",
      messagingSenderId: "384670622514",
      appId: "1:384670622514:web:8ca2d32d2001c53f05ed2b"
    }
  };