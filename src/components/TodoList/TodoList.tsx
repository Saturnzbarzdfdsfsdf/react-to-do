import { ChangeEvent, FC } from 'react';

import { FilterValuesType } from '../../app/App';

import { AddItemForm, EditableSpan } from '../index';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './TodoList.module.css';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export interface ITaskType {
	id: string;
	title: string;
	isDone: boolean;
}

export interface ITodo {
	todoListsId: string;
	title: string;
	tasks: Array<ITaskType>;
	filter: FilterValuesType;
	removeTodoList: (todoLists: string) => void;
	onClickClear: (taskId: string, todoListsId: string) => void;
	changeFilter: (value: FilterValuesType, todoListsId: string) => void;
	addTask: (title: string, todoListsId: string) => void;
	changeTaskTitle: (id: string, todoListsId: string, newTitle: string) => void;
	changeTodoListTitle: (todoListsId: string, newTitle: string) => void;
	changeCheckboxStatus: (
		taskId: string,
		isDone: boolean,
		todoListsId: string
	) => void;
}

const TodoList: FC<ITodo> = ({
	todoListsId,
	title,
	tasks,
	filter,
	onClickClear,
	changeFilter,
	addTask,
	changeCheckboxStatus,
	changeTodoListTitle,
	removeTodoList,
	changeTaskTitle,
}) => {
	const onClickAllHandler = () => changeFilter('all', todoListsId);
	const onClickActiveHandler = () => changeFilter('active', todoListsId);
	const onClickCompletedHandler = () => changeFilter('completed', todoListsId);
	const deleteTodoList = () => removeTodoList(todoListsId);

	const addTasks = (title: string) => {
		addTask(title, todoListsId);
	};

	const handleChangeTodoListTitle = (newTitle: string) => {
		changeTodoListTitle(newTitle, todoListsId);
	};

	return (
		<div>
			<h3>
				<EditableSpan
					title={title}
					onChangeSpanTitle={handleChangeTodoListTitle}
				/>
				<Button color='error' variant='outlined' onClick={deleteTodoList}>
					delete
				</Button>
			</h3>

			<AddItemForm addItem={addTasks} />

			<ul>
				{tasks.map(task => {
					const onRemoveHandler = () => {
						onClickClear(task.id, todoListsId);
					};
					const onChangeCheckboxHandler = (
						e: ChangeEvent<HTMLInputElement>
					) => {
						changeCheckboxStatus(task.id, e.currentTarget.checked, todoListsId);
					};
					const onChangeTitleHandler = (newTitle: string) => {
						changeTaskTitle(task.id, newTitle, todoListsId);
					};
					return (
						<div className={task.isDone ? styles.is_done : ''} key={task.id}>
							<Checkbox
								size='small'
								onChange={onChangeCheckboxHandler}
								checked={task.isDone}
							/>
							<EditableSpan
								title={task.title}
								onChangeSpanTitle={onChangeTitleHandler}
							/>
							<IconButton
								size='small'
								onClick={onRemoveHandler}
								aria-label='delete'
							>
								<DeleteIcon fontSize='small' />
							</IconButton>
						</div>
					);
				})}
			</ul>
			<div className={styles.btn}>
				<Button
					variant={filter === 'all' ? 'contained' : 'text'}
					onClick={onClickAllHandler}
				>
					All
				</Button>
				<Button
					color='primary'
					variant={filter === 'active' ? 'contained' : 'text'}
					onClick={onClickActiveHandler}
				>
					Active
				</Button>
				<Button
					color='secondary'
					variant={filter === 'completed' ? 'contained' : 'text'}
					onClick={onClickCompletedHandler}
				>
					Completed
				</Button>
			</div>
		</div>
	);
};

export default TodoList;
