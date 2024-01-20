import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { getInputError } from '../utils/getInputError';
import { MdError } from 'react-icons/md';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
  position: relative;
`;

const Input = ({ id, name, label, type, validation, placeholder, multiline, className }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	// check for errors
	const inputError = getInputError(errors, name);
	const isInvalid = inputError !== null;

	return (
		<Container className={className}>
			{multiline ? (
				<textarea
					id={id}
					name={name}
					placeholder={placeholder}
					style={{ width: '100%' }}
					{...register(name, validation)}
				></textarea>
			) : (
				<input
					id={id}
					name={name}
					type={type}
					placeholder={placeholder}
					{...register(name, validation)}
				></input>
			)}

			<label htmlFor={id}>{label}</label>

			{isInvalid && <InputError message={inputError.message} />}
		</Container>
	);
};

const InputError = ({ message }) => {
	return (
		<div className='validation-error'>
			<MdError />
			{message}
		</div>
	);
};

export default Input;
