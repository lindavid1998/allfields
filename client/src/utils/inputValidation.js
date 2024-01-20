export const comment_validation = {
	id: 'body',
	name: 'body',
	label: 'Comments',
	multiline: true,
	validation: {
		required: {
			value: true,
			message: 'required',
		},
	},
};

export const date_visited_validation = {
	id: 'date',
	name: 'date',
	label: 'Date visited',
	type: 'date',
};

export const first_name_validation = {
	id: 'first-name',
	label: 'First name',
	name: 'firstName',
	type: 'text',
	placeholder: 'First name',
	validation: {
		required: {
			value: true,
			message: 'required',
		},
	},
};

export const last_name_validation = {
	id: 'last-name',
	label: 'Last name',
	name: 'lastName',
	type: 'text',
	placeholder: 'Last name',
	validation: {
		required: {
			value: true,
			message: 'required',
		},
	},
};

export const email_validation = {
	name: 'email',
	label: 'Email',
	type: 'email',
	id: 'email',
	placeholder: 'Email address',
	validation: {
		required: {
			value: true,
			message: 'required',
		},
		pattern: {
			value:
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: 'not valid email',
		},
	},
};

export const password_validation = {
	name: 'password',
	label: 'Password',
	type: 'password',
	id: 'password',
	placeholder: 'Password',
	validation: {
		required: {
			value: true,
			message: 'required',
		},
		minLength: {
			value: 6,
			message: 'min 6 characters',
		},
	},
};