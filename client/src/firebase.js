import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { ref, set, query, get, getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
export const storage = getStorage();

export const addUser = (userId, firstName, lastName, email) => {
	// adds user to realtime database
	set(ref(db, 'users/' + userId), {
		email: email,
		firstName: firstName,
		lastName: lastName,
	}).catch((err) => console.error(err));
};

export const getUserId = (auth) => {
	// returns current user's uid if user is logged in
	const currentUser = auth.currentUser;
	return currentUser ? currentUser.uid : null;
};

export const getUserFullName = async (uid) => {
	// returns user's full name as string
	try {
		const dataRef = query(ref(db, 'users/' + uid));
		const snapshot = await get(dataRef);
		const data = snapshot.val();
		return `${data.firstName} ${data.lastName}`;
	} catch (error) {
		console.error(error);
	}
};
