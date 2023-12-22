import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import Subhero from './Subhero';
import SignUp from './SignUp';
import Quotes from './Quotes';
import Footer from '../../components/Footer';
import { auth } from '../../firebase';
import { getUserFullName } from '../../firebase';
import Spinner from '../../components/Spinner';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 0;
	align-items: center;
	width: 100%;
`;

const Landing = () => {
	let [user, setUser] = useState(null);
	let [name, setName] = useState('');
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchName = async (uid) => {
			try {
				const fullName = await getUserFullName(uid);
				setName(fullName);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		const unsubscribe = auth.onAuthStateChanged((user) => {
			setLoading(true);
			if (user) {
				setUser(user)
				fetchName(user.uid)
			} else {
				setLoading(false);
			}
			
		});

		return () => unsubscribe();
	}, []);

	if (loading) return <Spinner />;

	return (
		<Wrapper>
			<Hero name={name} />
			<Subhero />
			<SignUp user={user} />
			<Quotes />
			<Footer />
		</Wrapper>
	);
};

export default Landing;
