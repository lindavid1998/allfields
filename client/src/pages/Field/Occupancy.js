import React from 'react';
import Radio from '../../components/Radio';
import './Occupancy.css';

const Occupancy = () => {
	return (
		<div className='occupancy'>
			<div className='label'>Occupancy</div>
			<div className='occupancy-input'>
				<Radio name='occupancy' label='Empty' value='empty' />
				<Radio name='occupancy' label='Light' value='light' />
				<Radio name='occupancy' label='Packed' value='packed' />
				<Radio name='occupancy' label='N/A' value='na' />
			</div>
		</div>
	);
};

export default Occupancy;
