import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import { Route, Routes } from "react-router-dom"

function App() {
	// const [message, setMessage] = useState('');

	// useEffect(() => {
	// 	fetch('http://localhost:8000/')
	// 		.then((res) => res.json())
	// 		.then((data) => setMessage(data.message));
	// }, []);

	// return (
		// <div>
			// 	<Home></Home>
			// 	{/* <h1>{message}</h1> */}
			// 	{/* <Login></Login> */}
			// 	{/* <SignUp></SignUp> */}
		// </div>
	// )

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/signup' element={<SignUp />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
}

export default App;
