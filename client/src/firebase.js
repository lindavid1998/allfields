// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { ref, set } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBIfA-Dplug7uzgiZ5p-ZFQMBLS5FJa42M',
	authDomain: 'allfields-570a5.firebaseapp.com',
	databaseURL: 'https://allfields-570a5-default-rtdb.firebaseio.com',
	projectId: 'allfields-570a5',
	storageBucket: 'allfields-570a5.appspot.com',
	messagingSenderId: '289276614512',
	appId: '1:289276614512:web:d7d4f6b8e1395098a221b5',
	measurementId: 'G-7GJKQX872K',
};

export const addUser = (userId, firstName, lastName, email) => {
	set(ref(db, 'users/' + userId), {
		email: email,
		firstName: firstName,
		lastName: lastName,
	}).catch((err) => console.error(err));
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
