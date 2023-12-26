import React, { useState } from 'react'
import Tab from '../../components/Tab'
import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: var(--main-bg-color);
	width: 60%;
	height: 70%;
`;

const Menu = () => {
	const [activeTab, setActiveTab] = useState('Posts');
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
  return (
		<Wrapper>
			<Menu />
			<p>Coming soon...</p>
		</Wrapper>
	);
}

export default Activity