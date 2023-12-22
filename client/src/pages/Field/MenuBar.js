import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import { auth, getUserId } from '../../firebase';
import { PathContext } from '../../utils';
import Tab from '../../components/Tab';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
	padding: 10px 16px;
`;

const MenuBar = ({ toggleForm }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const { setRedirectPath } = useContext(PathContext);

	const handleClick = async () => {
		let userId = getUserId(auth);
		if (!userId) {
			setRedirectPath(location.pathname);
			navigate('/sign-in');
		} else {
			toggleForm();
		}
	};

	return (
		<Wrapper>
			<Tab text='Posts' />
			<Tab text='Calendar' />
			<Tab text='Directions' />
			<Button className='sm-btn' text='Write post' onClick={handleClick} />
		</Wrapper>
	);
};

export default MenuBar;
