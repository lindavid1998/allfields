import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: start;
  width: 100%;
  padding: var(--home-padding);
  background: var(--light-bg-color);
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	max-width: var(--max-width);
	margin: 0 auto;
`;

const Header = styled.h3`
  font-size: 24px;
`

const Text = styled.p`
	font-size: 1.1rem;
`

const Subhero = () => {
	return (
		<Wrapper>
			<Content>
				<Header>
					Hate gearing up for football and driving only to find a completely
					occupied or unplayable field?
				</Header>
				<Text>
					We do too. That's why we made AllFields, a web service that provides
					crowdsourced reports of field occupancy and surface conditions
				</Text>
			</Content>
		</Wrapper>
	);
};

export default Subhero;
