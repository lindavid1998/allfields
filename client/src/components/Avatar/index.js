import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import avatarImg from '../../assets/soccer-ball.png';

const Wrapper = styled.div`
	border-radius: 50%;
	height: 40px;
	width: 40px;
	background-image: url(${avatarImg});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	z-index: 999;
`;

const PositionedDropdown = styled.div`
	position: absolute;
	top: 40px;
`;

const Avatar = () => {
	const wrapperRef = useRef(null);
	const [showDropdown, setShowDropdown] = useState(false);
	

	const toggleDropdown = (e) => {
		if (e.target === wrapperRef.current) {
			setShowDropdown((prevState) => !prevState);
		}
	};

	return (
		<div>
			<Wrapper ref={wrapperRef} onClick={toggleDropdown}>
				{showDropdown ? (
					<PositionedDropdown>
						<Dropdown />
					</PositionedDropdown>
				) : null}
			</Wrapper>
		</div>
	);
};

export default Avatar;
