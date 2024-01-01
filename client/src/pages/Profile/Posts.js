import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
	ref,
	onValue,
	equalTo,
	query,
	orderByChild,
	off,
} from 'firebase/database';
import { useParams } from 'react-router-dom';
import Post from '../../components/Post';

const Posts = () => {
	const { userId } = useParams();
	const [postData, setPostData] = useState([]);
	const [isPostDataEmpty, setIsPostDataEmpty] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataRef = query(
					ref(db, 'posts'),
					orderByChild('userId'),
					equalTo(userId)
				);

				const onData = (snapshot) => {
					const data = snapshot.val();
					if (snapshot.exists()) {
						setPostData(data);
						setIsPostDataEmpty(false);
					} else {
						setIsPostDataEmpty(true);
					}
				};

				onValue(dataRef, onData);

				// Cleanup function to unsubscribe when component unmounts
				return () => off(dataRef, onData);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, [userId]);

	if (isPostDataEmpty) return <p>No posts yet!</p>;

  const postIds = Object.keys(postData);

	return (
		<div>
			{postIds.map((postId, index) => {
				const post = postData[postId];
				return (
					<Post
						key={index}
						body={post.body}
						postDate={post.postDate}
						visitDate={post.visitDate}
						userId={post.userId}
						postId={postId}
            conditions={post.conditions}
            showIcons={false}
            header='field'
            fieldId={post.fieldId}
					/>
				);
			})}
		</div>
	);
};

export default Posts;
