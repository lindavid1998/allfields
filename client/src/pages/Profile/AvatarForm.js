import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { getUserId, storage } from '../../firebase';
import { ref as sRef, uploadBytes } from 'firebase/storage';
import { auth } from '../../firebase';

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	color: var(--main-text-color);
	border-radius: 20px;
	background-color: var(--main-bg-color);
	width: 400px;
	padding: 20px;
	gap: 20px;
	& > * {
		margin: 0;
	}
`;

const FormRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const Buttons = styled.div`
	margin-top: 25px;
	align-self: flex-end;
	display: flex;
	gap: 10px;
`;

const Back = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 35px;
	height: 35px;
	border-radius: 50%;
	transition: 0.2s all;
	&:hover {
		background-color: var(--light-btn-color);
	}
`;

const AvatarForm = ({ toggleVisibility }) => {
	const [isFileEmpty, setIsFileEmpty] = useState(true);
	const fileInputRef = useRef(null);

	const uploadAvatar = async (event) => {
		try {
      event.preventDefault();
      
			// Find the form using the button's form property
			const form = event.target.form;

			const formData = new FormData(form);
			const file = formData.get('avatar');
			const uid = getUserId(auth);
			const storageRef = sRef(storage, `images/avatars/${uid}`);
			await uploadBytes(storageRef, file);
      toggleVisibility();
      
      // show success message
      console.log('uploaded avatar');
      
      // reload page
      refreshPage()
		} catch (err) {
			console.log(err);
		}
  };
  
  const refreshPage = () => {
    window.location.reload(false);
  }

	const handleChange = (event) => {
		if (event.target.value.length > 0) {
			console.log('file detected');
			setIsFileEmpty(false);
		} else {
			console.log('no file');
			setIsFileEmpty(true);
		}
	};

	const handleReset = () => {
		fileInputRef.current.reset();
		setIsFileEmpty(true);
	};

	return (
		<StyledForm ref={fileInputRef}>
			<Back onClick={toggleVisibility}>
				<FontAwesomeIcon icon={faX} />
			</Back>

			<h5>Upload photo</h5>

			<FormRow>
				<input
					type='file'
					id='avatar'
					name='avatar'
					accept='image/png, image/jpeg'
					onChange={handleChange}
					required
				/>
			</FormRow>

			<Buttons>
				<Button
					className='sm-btn light-btn'
					text='Reset'
					onClick={handleReset}
				/>
				<Button
					className={isFileEmpty ? 'sm-btn light-btn' : 'sm-btn'}
					text='Upload'
					onClick={uploadAvatar}
				/>
			</Buttons>
		</StyledForm>
	);
};

export default AvatarForm;
