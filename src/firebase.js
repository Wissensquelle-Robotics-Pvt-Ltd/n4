import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBXwixG5UZEvjoOh7d8RReEdrSS4ESk11o",
  authDomain: "luckywheel-378fd.firebaseapp.com",
  databaseURL: "https://luckywheel-378fd.firebaseio.com",
  projectId: "luckywheel-378fd",
  storageBucket: "luckywheel-378fd.appspot.com",
  messagingSenderId: "158568481263",
  appId: "1:158568481263:web:d9fe4f7a83a9812d13761a",
};
var Firebase;
if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}
//export firebase auth
export const auth = firebase.auth();

export default Firebase;
