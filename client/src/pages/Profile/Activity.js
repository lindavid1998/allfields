import React, { useState } from 'react'
import Tab from '../../components/Tab'
import styled from 'styled-components';
import Favorites from './Favorites';
import Posts from './Posts';

const Wrapper = styled.div`
	background-color: var(--main-bg-color);
	width: 60%;
	height: 70%;
	display: flex;
	gap: 12px;
	flex-direction: column;
	> :first-child {
		margin-bottom: 12px;
	}
`;

const Menu = ({ setActiveTab, activeTab }) => {
	const tabs = ['Posts', 'Favorites']

	return (
		<div className='menu-bar'>
			{tabs.map((tab, index) => (
				<Tab
					key={index}
					text={tab}
					onClick={() => setActiveTab(tab)}
					className={activeTab === tab ? 'active tab' : 'tab'}
				/>
			))}
		</div>
	);
}

const Activity = () => {
	const [activeTab, setActiveTab] = useState('Posts');

  return (
		<Wrapper>
			<Menu activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === 'Posts' && <Posts />}
			{activeTab === 'Favorites' && <Favorites />}
		</Wrapper>
	);
}

export default Activity