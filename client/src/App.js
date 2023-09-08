import React from 'react';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import AuthStatus from './components/Auth';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
`;

function App() {
	return (
		<Wrapper>
			<Navbar />
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/sign-in' element={<SignIn />} />
				<Route path='/auth-status' element={<AuthStatus />} />
			</Routes>
		</Wrapper>
	);
}

export default App;
