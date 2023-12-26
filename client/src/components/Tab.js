import React from 'react'
import './Tab.css';

const Tab = ({ text, className, onClick }) => {
	return <div onClick={onClick} className={className}>{text}</div>;
}

export default Tab