import React from 'react';
import styled from 'styled-components';

const StyledA = styled.a`
	text-decoration: none;
	color: inherit;
`;

const FieldHeader = ({ fieldId, field }) => {
	return (
		<h6 className='bold-text'>
			<StyledA href={`/fields/${fieldId}`}>{field}</StyledA>
		</h6>
	);
};

const UserHeader = ({ userId, name }) => {
	return (
		<h6 className='bold-text'>
			<StyledA href={`/users/${userId}`}>{name}</StyledA>
		</h6>
	);
};

const PostHeader = ({ header, fieldId, userId, field, name }) => {
	if (header === 'field')
		return <FieldHeader fieldId={fieldId} field={field} />;

	return <UserHeader userId={userId} name={name} />;
};

export default PostHeader;
