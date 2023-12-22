import React from 'react';
import styled from 'styled-components';
import githubLogo from '../assets/github-mark-white.png';
import linkedinLogo from '../assets/linkedin-logo.svg';

const Wrapper = styled.div`
	width: 100%;
	background-color: var(--dark-bg-color);
	padding: var(--home-padding);
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	gap: 20px;
	max-width: var(--max-width);
	margin: 0 auto;
`;

const Text = styled.div`
	color: #fff;
	font-weight: bold;
	display: flex;
	align-items: center;
`;

const Img = styled.img`
	height: 30px;
	width: auto;
	cursor: pointer;
`;

const Footer = () => {
	return (
		<Wrapper>
			<Content>
				<Text>A Personal Project by David Lin</Text>
				<a href='https://www.linkedin.com/in/lindavid1998/'>
					<Img src={linkedinLogo} />
				</a>
				<a href='https://github.com/lindavid1998'>
					<Img src={githubLogo} />
				</a>
			</Content>
		</Wrapper>
	);
};

export default Footer;
