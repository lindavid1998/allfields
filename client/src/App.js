import React, { useState } from 'react';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Fields from './pages/Fields';
import AuthStatus from './components/Auth';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Field from './pages/Field';
import { PathContext } from './utils';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
`;

function App() {
	// const [path, setPath] = useState('/')
	// const value = { path, setPath }

	const [redirectPath, setRedirectPath] = useState('/');

	return (
		<Wrapper>
			<PathContext.Provider value={{ redirectPath, setRedirectPath }}>
				<Navbar />
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/auth-status' element={<AuthStatus />} />
					<Route path='/fields' element={<Fields />} />
					<Route path='/fields/:fieldId' element={<Field />} />
					<Route
						path='/sign-up'
						element={
							<Auth
								key='sign-up'
								isSignIn={false}
								background='pexels-stanley-morales-3148452.jpg'
							/>
						}
					/>
					<Route
						path='/sign-in'
						element={
							<Auth
								key='sign-in'
								isSignIn={true}
								background='pexels-tembela-bohle-1884574.jpg'
							/>
						}
					/>
				</Routes>
			</PathContext.Provider>
		</Wrapper>
	);
}

export default App;
