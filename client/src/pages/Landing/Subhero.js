import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: start;
  width: 100%;
  padding: var(--home-padding);
  background: var(--light-bg-color);
	text-align: center;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	max-width: var(--max-width);
	margin: 0 auto;
	align-items: center;
`;

const Subhero = () => {
	return (
		<Wrapper>
			<Content>
				<h4>
					Hate gearing up for football only to find a completely unplayable
					field?
				</h4>
				<h6>
					We do too. That's why we made AllFields, a place where you'll find
					crowdsourced reports of field conditions.
				</h6>
			</Content>
		</Wrapper>
	);
};

export default Subhero;
