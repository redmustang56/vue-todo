import firebase from 'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    projectId: 'vue-todo-8512a',
    databaseURL: 'https://vue-todo-8512a.firebaseio.com'
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
export const db = firebase.initializeApp(firebaseConfig).firestore()

// const { TimeStamp, GeoPoint } = firebase.firestore
// export { TimeStamp, GeoPoint }