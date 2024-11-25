import TextField from '@mui/material/TextField';
import { FC, useState, ChangeEvent, KeyboardEvent } from 'react';

type TEditableSpan = {
	title: string;
	onChangeSpanTitle: (newTitle: string) => void;
};

const EditableSpan: FC<TEditableSpan> = ({ onChangeSpanTitle, title }) => {
	const [spanTitle, setSpanTitle] = useState('');

	const [editMode, setEditMode] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSpanTitle(e.currentTarget.value);
	};

	const activeEditMode = () => {
		setSpanTitle(title);
		setEditMode(true);
	};

	const handleBlurOrEnter = () => {
		setEditMode(false);
		onChangeSpanTitle(spanTitle);
	};

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			handleBlurOrEnter();
		}
	};

	return editMode ? (
		<TextField
			id='outlined-basic'
			variant='standard'
			value={spanTitle}
			onKeyUp={handleKeyUp}
			onChange={handleChange}
			onBlur={handleBlurOrEnter}
			autoFocus
		/>
	) : (
		<span onDoubleClick={activeEditMode}>{title}</span>
	);
};

export default EditableSpan;
