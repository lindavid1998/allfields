import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import { auth, getUserId } from '../../firebase';
import { PathContext } from '../../utils';
import Tab from '../../components/Tab';

const MenuBar = ({ toggleForm, openMaps }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activeTab, setActiveTab] = useState('Posts');
	const { setRedirectPath } = useContext(PathContext);

	const handleWritePost = async () => {
		let userId = getUserId(auth);
		if (!userId) {
			setRedirectPath(location.pathname);
			navigate('/sign-in');
		} else {
			toggleForm();
		}
	};

	const tabs = ['Posts', 'Calendar', 'Directions'];

	return (
		<div className='menu-bar'>
			{tabs.map((tab, index) => (
				<Tab
					key={index}
					text={tab}
					onClick={tab === 'Directions' ? openMaps : () => setActiveTab(tab)}
					className={activeTab === tab ? 'active tab' : 'tab'}
				/>
			))}

			<Button className='sm-btn' text='Write post' onClick={handleWritePost} />
		</div>
	);
};

export default MenuBar;
