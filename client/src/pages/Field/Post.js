import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserFullName } from '../../firebase';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid var(--light-text-color);
	padding: 10px 0;
`;

const User = styled.div`
	color: var(--main-text-color);
	font-weight: bold;
`;

const Date = styled.div`
	font-size: 0.8rem;
	color: var(--gray-text-color);
	margin-bottom: 15px;
`;

const Body = styled.div`
	color: var(--main-text-color);
`;

const Post = ({ body, date, userId }) => {
	let [name, setName] = useState('');

	useEffect(() => {
		const fetchName = async () => {
			try {
				const fullName = await getUserFullName(userId);
				setName(fullName);
			} catch (error) {
				console.error(error);
			}
		};
		fetchName();
	}, []);

	return (
		<Wrapper>
			<User>{name}</User>
			<Date>{date}</Date>
			<Body>{body}</Body>
		</Wrapper>
	);
};

export default Post;
