import React from 'react';
import styled from 'styled-components';
import githubLogo from '../../assets/github-mark-white.png'

const Wrapper = styled.div`
	background-color: var(--dark-bg-color);
	width: 100%;
	padding: var(--home-padding);
`;

const Subwrapper = styled.div`
  display: flex;
  gap: 20px;
  align-ites: center;
`

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
`

const Footer = () => {
	return (
		<Wrapper>
			<Subwrapper>
				<Text>A Personal Project by David Lin</Text>
				<Img src={githubLogo} />
			</Subwrapper>
		</Wrapper>
	);
};

export default Footer;
