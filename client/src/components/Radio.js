import React from 'react'
import './Radio.css'

const Radio = ({value, label, name}) => {
  return (
		<>
			<label className='radio-label'>
				<input
					name={name}
					type='radio'
					value={value}
					defaultChecked={value === 'na'}
				/>
				<span>{label}</span>
			</label>
		</>
	);
}

export default Radio