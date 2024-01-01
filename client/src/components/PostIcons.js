import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const Icons = styled.div`
	display: flex;
	gap: 10px;
	position: absolute;
	top: 20px;
	right: 50px;
`;

const Icon = styled.div`
	transition: transform 0.2s ease-in-out;
	&:hover {
		transform: scale(1.2);
	}
`;

const PostIcons = ({ postId, editPost, deletePost }) => {
  return (
		<Icons>
			<Icon onClick={editPost}>
				<FontAwesomeIcon icon={faPenToSquare} />
			</Icon>

			<Icon onClick={() => deletePost(postId)}>
				<FontAwesomeIcon icon={faTrashCan} />
			</Icon>
		</Icons>
	);
}

export default PostIcons