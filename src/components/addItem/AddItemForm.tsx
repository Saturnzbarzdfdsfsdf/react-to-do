import { useState, FC, ChangeEvent, KeyboardEvent } from 'react';

import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ControlPoint } from '@mui/icons-material';



import styles from '../TodoList/TodoList.module.css';

type TAddItemFormProps = {
	addItem: (title: string) => void;
};

const AddItemForm: FC<TAddItemFormProps> = ({ addItem }) => {
	const [error, setError] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState('');

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value);
	};

	const onClickKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			addItem(inputValue);
			setInputValue('');
		}
		setError(false);
	};

	const onClickAddItem = () => {
		if (inputValue.trim() !== '') {
			addItem(inputValue.trim());
			setInputValue('');
		} else {
			setError(true);
		}
	};

	return (
		<div>
			<TextField
				label='Какую задачу добавить ?'
				id='outlined-basic'
				variant='standard'
				error={!!error}
				// helperText={error}
				className={error ? styles.error : ''}
				onChange={onChangeInputHandler}
				onKeyUp={onClickKeyUpHandler}
				value={inputValue}
			/>
			<IconButton
				onClick={onClickAddItem}
				color='secondary'
				size='small'
			>
				<ControlPoint/>
			</IconButton>
			{error && <div className={styles.error__massage}>Field is required</div>}
		</div>
	);
};

export default AddItemForm;
