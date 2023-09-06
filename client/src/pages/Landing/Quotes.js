import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	padding: var(--home-padding);
	background-color: var(--light-text-color);
	width: 100%;
`;

const Content = styled.div`
	display: flex;
	gap: 50px;
	max-width: var(--max-width);
	margin: 0 auto;
`;

const Quote = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	line-height: 1.5;
`;

const Text = styled.div`
	font-style: italic;
`;

const Person = styled.div`
	font-weight: bold;
`;

const Quotes = () => {
	const data = [
		{
			person: 'Cristiano Ronaldo',
			text: `Thanks to AllFields, I can always find the best field for my training sessions. It's really helping me improve as a player!`,
		},
		{
			person: 'Lionel Messi',
			text: `I would not have won my 7 Ballon d'Ors without AllFields.`,
		},
	];

	return (
		<Wrapper>
			<Content>
				{data.map((quote, index) => (
					<Quote key={index}>
						<Text>"{quote.text}"</Text>
						<Person>- {quote.person}</Person>
					</Quote>
				))}
			</Content>
		</Wrapper>
	);
};

export default Quotes;
