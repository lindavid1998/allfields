import React from 'react';
import './Radio.css';

const Radio = ({ value, label, name, handleChange, defaultChecked}) => {
	return (
		<>
			<label className='radio-label'>
				<input
					name={name}
					type='radio'
					value={value}
					defaultChecked={defaultChecked}
					onChange={handleChange}
				/>
				<span>{label}</span>
			</label>
		</>
	);
};

export default Radio;
