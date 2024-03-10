import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { db, auth, getUserId, storage } from '../../firebase';
import { ref, child, push, update } from 'firebase/database';
import { capitalize } from '../../utils/utils';
import { ref as sRef, uploadBytes } from 'firebase/storage';
import Occupancy from './Occupancy';

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

const Textarea = styled.textarea`
	width: 100%;
`;

const PositionedBtn = styled.div`
	margin-top: 25px;
	align-self: flex-end;
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

const Conditions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

const Form = ({ toggleVisibility, formData, fieldName }) => {
	const [occupancy, setOccupancy] = useState(formData?.occupancy || null);
	const [visitDate, setVisitDate] = useState(formData?.visitDate || null);
	const [body, setBody] = useState(formData?.body || null);
	const [areImagesAdded, setAreImagesAdded] = useState(false);

	const [conditions, setConditions] = useState(
		formData?.conditions || {
			muddy: false,
			slippery: false,
			bumpy: false,
			dry: false,
			puddles: false,
			overgrown: false,
			patchy: false,
			hard: false,
			frosty: false,
		}
	);

	const params = useParams();

	const writePost = (
		userId,
		visitDate,
		body,
		fieldId,
		conditions,
		occupancy
	) => {
		// write post to database
		let postDate = new Date(); // get current date as post date
		postDate = postDate.toISOString().split('T')[0];
	
		occupancy = occupancy === 'null' ? null : occupancy

		const postData = {
			postDate,
			visitDate,
			body,
			fieldId,
			userId,
			conditions,
			occupancy,
		};

		// use existing postId as key if editing post, otherwise generate new key
		const key = formData ? formData.postId : push(child(ref(db), 'posts')).key;

		if (areImagesAdded) {
			uploadImage(key)
			postData['imagesAdded'] = true
		}

		updatePostDatabase(postData, key);
	};

	const updatePostDatabase = (postData, key) => {
		try {
			const updates = {};
			updates['/posts/' + key] = postData;
			update(ref(db), updates);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = () => {
		const form = document.getElementById('post-form')

		if (form.checkValidity()) {
			let userId = getUserId(auth);
			const fieldId = params.fieldId;
			writePost(userId, visitDate, body, fieldId, conditions, occupancy); // write to database
			toggleVisibility(); // hide form
		} else {
			alert('Comments cannot be empty!')
		}
	};

	const handleOccupancyChange = (e) => {
		setOccupancy(e.target.value);
	};

	const uploadImage = async (key) => {
		try {
			// select the form 
			const form = document.getElementById('post-form')

			// select the file 
			const formData = new FormData(form);
			const files = formData.getAll('user-images');

			if (files.length > 0) {
				// upload to firebase storage
				// const storageRef = sRef(storage, `images/user-images/${key}`);
				for (const file of files) {
					const storageRef = sRef(storage, `images/user-images/${key}/${file.name}`);
					await uploadBytes(storageRef, file);
				}
				
				// reload page
				window.location.reload(false);
			} else {
				console.log('no image to upload')
			}
		} catch (err) {
			console.log(err);
		}
  };

	const handleImageChange = (event) => {
		if (event.target.value.length > 0) {
			setAreImagesAdded(true);
		} else {
			setAreImagesAdded(false);
		}
	};

	return (
		<StyledForm id='post-form'>
			<Back onClick={toggleVisibility}>
				<FontAwesomeIcon icon={faX} />
			</Back>

			<h5>{fieldName}</h5>

			<FormRow>
				<label htmlFor='date'>Date visited</label>
				<input
					type='date'
					id='date'
					name='date'
					onChange={(e) => setVisitDate(e.target.value)}
					value={visitDate || ''}
				/>
			</FormRow>

			<FormRow>
				<label htmlFor='body'>Comments</label>
				<Textarea
					id='body'
					name='body'
					rows='4'
					cols='50'
					required
					onChange={(e) => setBody(e.target.value)}
					value={body || ''}
				/>
			</FormRow>

			<FormRow>
				<label htmlFor='conditions'>Conditions</label>
				<Conditions>
					{Object.keys(conditions).map((key, index) => (
						<Button
							key={index}
							className={`sm-btn unbold-btn ${
								conditions[key] ? '' : 'light-btn'
							}`}
							text={capitalize(key)}
							onClick={() =>
								setConditions((prevConditions) => ({
									...prevConditions,
									[key]: !prevConditions[key],
								}))
							}
						/>
					))}
				</Conditions>
			</FormRow>

			<FormRow>
				<label htmlFor='user-images'>Add images</label>
				<input
					type='file'
					id='user-images'
					name='user-images'
					accept='image/png, image/jpeg'
					onChange={handleImageChange}
					multiple
				/>
			</FormRow>

			<Occupancy
				checked={occupancy}
				handleChange={handleOccupancyChange}
			/>

			<PositionedBtn>
				<Button
					className='sm-btn'
					text='Post'
					type='button'
					onClick={handleSubmit}
				/>
			</PositionedBtn>
		</StyledForm>
	);
};

export default Form;
