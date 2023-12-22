import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
	position: absolute;
	bottom: 80%;
	left: 5%;
	background-color: #fff;
	padding: 0 4px;
	opacity: 0;
	transition: opacity 0.4s ease;
	color: inherit;
	font-size: 0.9rem;
`;

const Input = styled.input`
	color: inherit;
	height: 40px;
	border-radius: 8px;
	padding: 12px 16px;
	border: 1px solid var(--gray-text-color);
	font-size: 1.1rem;
	width: 450px;
	&:focus {
		outline: 1px solid var(--main-text-color);
	}
	&:focus::placeholder {
		color: transparent;
	}
	&:not(:placeholder-shown) + ${Label} {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	color: var(--main-text-color);
	& ${Input}:focus + ${Label} {
		opacity: 1;
	}
`;

const TextInput = ({ label, type, placeholder, name, onChange }) => {
	return (
		<Wrapper>
			<Input
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				required
			/>
			<Label htmlFor={name}>{label}</Label>
		</Wrapper>
	);
};

export default TextInput;
