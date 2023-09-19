import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
  border-bottom: 1px solid var(--light-text-color);
  padding: 10px 0;
`;

const User = styled.div`
  color: var(--main-text-color);
  font-weight: bold;
`;

const Date = styled.div`
  font-size: 0.8rem;
  color: var(--gray-text-color);
  margin-bottom: 15px;
`;

const Body = styled.div`
  color: var(--main-text-color);
`;

const Report = ({body, date, userId}) => {
	return (
		<Wrapper>
			<User>{userId}</User>
			<Date>{date}</Date>
			<Body>{body}</Body>
		</Wrapper>
	);
};

export default Report;
