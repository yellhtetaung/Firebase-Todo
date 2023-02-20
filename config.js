import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSbe6v_p3Ihbuo8QLpuNoSaVlrZ5VrUKY",
  authDomain: "todo-2b76a.firebaseapp.com",
  projectId: "todo-2b76a",
  storageBucket: "todo-2b76a.appspot.com",
  messagingSenderId: "636410554594",
  appId: "1:636410554594:web:e298a75ba444698ff3d6bb",
  measurementId: "G-7Z4JJGNKD8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
