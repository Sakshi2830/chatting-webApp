import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyDfz9ZysUUR9UXAOQv9UcS0CGUrMSmNEOk",
    authDomain: "chatting-webapp-aa9c3.firebaseapp.com",
    projectId: "chatting-webapp-aa9c3",
    storageBucket: "chatting-webapp-aa9c3.appspot.com",
    messagingSenderId: "943246691806",
    appId: "1:943246691806:web:e8c59e55e0fa562b95614f"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;