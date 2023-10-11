import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const Name = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
`;

const Conditions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

const Form = ({ toggleVisibility }) => {
	const [visitDate, setVisitDate] = useState(null);
	const [body, setBody] = useState(null);
	const [conditions, setConditions] = useState({
		muddy: false,
		slippery: false,
		bumpy: false,
		dry: false,
		puddles: false,
		overgrown: false,
		patchy: false,
		hard: false,
		frosty: false,
	});

	const navigate = useNavigate();
	const params = useParams();

	const writeNewPost = (userId, visitDate, body, fieldId, conditions) => {
		// get current date as post date
		let postDate = new Date();
		postDate = postDate.toISOString().split('T')[0];

		const postData = {
			postDate: postDate,
			visitDate: visitDate,
			body: body,
			fieldId: fieldId,
			userId: userId,
			conditions: conditions,
		};

		// get a key for the post
		const newPostKey = push(child(ref(db), 'posts')).key;

		const updates = {};
		updates['/posts/' + newPostKey] = postData;

		return update(ref(db), updates);
	};

	const handleSubmit = () => {
		// read user ID
		let userId = getUserId(auth);

		// if user is not logged in, route to log in page
		if (!userId) {
			navigate('/sign-in');
			return;
		}

		// read field ID
		const fieldId = params.id;

		writeNewPost(userId, visitDate, body, fieldId, conditions); // write post to database
		toggleVisibility(); // hide form
	};

	return (
		<StyledForm>
			<Back onClick={toggleVisibility}>
				<FontAwesomeIcon icon={faX} />
			</Back>
			<Name>Doyle Community Park</Name>
			<FormRow>
				<Label htmlFor='date'>Date visited</Label>
				<input
					type='date'
					id='date'
					name='date'
					required
					onChange={(e) => setVisitDate(e.target.value)}
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
				/>
			</FormRow>
			<FormRow>
				<Label htmlFor='conditions'>Conditions</Label>
				<Conditions>
					{Object.keys(conditions).map((key, index) => (
						<Button
							key={index}
							size='small'
							text={capitalize(key)}
							color={conditions[key] ? 'primary' : 'light'}
							bold={false}
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
					size='small'
					text='Post'
					color='primary'
					type='submit'
					onClick={handleSubmit}
				/>
			</PositionedBtn>
		</StyledForm>
	);
};

export default Form;
