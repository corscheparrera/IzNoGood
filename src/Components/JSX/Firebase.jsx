import Firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCI9p3KGB0UwBoqnYEZzm2tqSo3I12TfhA",
  authDomain: "iznogood-185815.firebaseapp.com",
  databaseURL: "https://iznogood-185815.firebaseio.com",
  projectId: "iznogood-185815",
  storageBucket: "iznogood-185815.appspot.com",
  messagingSenderId: "510010763162"
};

var fire = Firebase.initializeApp(config);

export default fire;
