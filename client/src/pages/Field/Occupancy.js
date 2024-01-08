import React from 'react';
import Radio from '../../components/Radio';
import './Occupancy.css';

const Occupancy = ({ handleChange, checked }) => {
	const options = ['Empty', 'Light', 'Busy'];

	const primaryRadioBtns = options.map((option) => (
		<Radio
			key={option.toLowerCase()}
			name='occupancy'
			label={option}
			value={option.toLowerCase()}
			handleChange={handleChange}
			defaultChecked={checked === option.toLowerCase()}
		/>
	));

	return (
		<div className='occupancy'>
			<div className='label'>Occupancy</div>
			<div className='occupancy-input'>
				{primaryRadioBtns}

				<Radio
					name='occupancy'
					label='N/A'
					value='null'
					handleChange={handleChange}
					defaultChecked={!checked}
				/>
			</div>
		</div>
	);
};

export default Occupancy;
