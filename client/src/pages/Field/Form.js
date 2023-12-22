import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { db, auth, getUserId } from '../../firebase';
import { ref, child, push, update } from 'firebase/database';
import { capitalize } from '../../utils';

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

const Label = styled.label`
	font-size: 1.05rem;
`;

const Conditions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

const Form = ({ toggleVisibility, formData, fieldName }) => {
	const [visitDate, setVisitDate] = useState(formData?.visitDate || null);

	const [body, setBody] = useState(formData?.body || null);

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

	const writePost = (userId, visitDate, body, fieldId, conditions) => {
		let postDate = new Date(); // get current date as post date
		postDate = postDate.toISOString().split('T')[0];

		const postData = {
			postDate: postDate,
			visitDate: visitDate,
			body: body,
			fieldId: fieldId,
			userId: userId,
			conditions: conditions,
		};

		// use existing postId as key if editing post, otherwise generate new key
		const key = formData ? formData.postId : push(child(ref(db), 'posts')).key;

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
		let userId = getUserId(auth);
		const fieldId = params.fieldId;
		writePost(userId, visitDate, body, fieldId, conditions); // write to database
		toggleVisibility(); // hide form
	};

	return (
		<StyledForm>
			<Back onClick={toggleVisibility}>
				<FontAwesomeIcon icon={faX} />
			</Back>

			<h5>{fieldName}</h5>

			<FormRow>
				<Label htmlFor='date'>Date visited</Label>
				<input
					type='date'
					id='date'
					name='date'
					required
					onChange={(e) => setVisitDate(e.target.value)}
					value={visitDate || ''}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor='body'>Comments</Label>
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
				<Label htmlFor='conditions'>Conditions</Label>
				<Conditions>
					{Object.keys(conditions).map((key, index) => (
						<Button
							key={index}
							className={`sm-btn unbold-btn ${conditions[key] ? '' : 'light-btn'}`}
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

			<PositionedBtn>
				<Button
					className='sm-btn'
					text='Post'
					type='submit'
					onClick={handleSubmit}
				/>
			</PositionedBtn>
		</StyledForm>
	);
};

export default Form;
