import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';

const StyledA = styled.a`
	text-decoration: none;
	color: inherit;
`;

const Wrapper = styled.div`
	display: flex;
	gap: 8px;
`;

const FieldHeader = ({ fieldId, field, postDate }) => {
	return (
		<>
			<h6 className='bold-text'>
				<StyledA href={`/fields/${fieldId}`}>{field}</StyledA>		
			</h6>

			<p className='gray small' style={{ margin: 0 }}>
				{postDate}
			</p>
		</>
	);
};

const UserHeader = ({ userId, name, postDate }) => {
	return (
		<Wrapper>
			<a href={`/users/${userId}`}>
				<Avatar userId={userId}></Avatar>
			</a>

			<div id='author'>
				<h6 className='bold-text' style={{ margin: 0 }}>
					<StyledA href={`/users/${userId}`}>{name}</StyledA>
				</h6>

				<p className='gray small' style={{ margin: 0 }}>
					{postDate}
				</p>
			</div>
		</Wrapper>
	);
};

const PostHeader = ({ header, fieldId, userId, field, name, postDate }) => {
	if (header === 'field')
		return <FieldHeader fieldId={fieldId} field={field} postDate={postDate} />;

	return <UserHeader userId={userId} name={name} postDate={postDate} />;
};

export default PostHeader;
