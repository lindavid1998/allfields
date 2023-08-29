import React from 'react'
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Form from './Form';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Login = () => {
  return (
		<Wrapper>
      <Navbar></Navbar>
      <Form></Form>
		</Wrapper>
	);
}

export default Login