import { useState } from 'react';

import { v1 } from 'uuid';

import { AddItemForm, TodoList } from '../components/index';
import { ITaskType } from '../components/TodoList/TodoList';

import {
	AppBar,
	Button,
	Container,
	IconButton,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material';

import Grid from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu';

import './App.css';

export type FilterValuesType = 'all' | 'completed' | 'active';

type TTaskState = {
	[key: string]: Array<ITaskType>;
};

type TodoListType = {
	id: string;
	title: string;
	filter: FilterValuesType;
};

function App() {
	// генерация id
	const todoListsId1 = v1();
	const todoListsId2 = v1();

	// tasks
	const [tasksObj, setTasksObj] = useState<TTaskState>({
		// Ключ
		[todoListsId1]: [
			// значение
			{ id: v1(), title: 'CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'HTML', isDone: true },
			{ id: v1(), title: 'Redux', isDone: false },
		],
		[todoListsId2]: [
			{ id: v1(), title: 'Book', isDone: true },
			{ id: v1(), title: 'Milk', isDone: false },
		],
	});
	// Список дел
	const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
		{ id: todoListsId1, title: 'What to learn', filter: 'all' },
		{ id: todoListsId2, title: 'what to buy', filter: 'all' },
	]);

	// Удаляем таску принимает: ( id задачи | id списка дел)
	const onClickClear = (id: string, todoListsId: string) => {
		// setTasksObj > передаем fn обратного вызова > она принимает prev состояние
		setTasksObj(prevTasksObj => {
			// Получение задач для списка дел (по ключу получаем список задач из prev)
			const tasks = prevTasksObj[todoListsId];
			// Проверяем на наличие массива задач
			if (!tasks) {
				console.warn(`No tasks found for todo list ID: ${todoListsId}`);
				return prevTasksObj; // Возвращаем предыдущее состояние без изменений
			}
			// filteredTasks, содержит все задачи, кроме той, id которой совпадает с переданным id
			const filteredTasks = tasks.filter(task => task.id !== id);

			return {
				...prevTasksObj,
				[todoListsId]: filteredTasks, // Обновляем только нужный список
			};
		});
	};

	// Чекбокс
	const changeCheckboxStatus = (
		taskId: string,
		isDone: boolean,
		todoListsId: string
	) => {
		setTasksObj(prevTasksObj => {
			const tasks = prevTasksObj[todoListsId];

			if (!tasks) {
				console.warn(`No tasks found for todo list ID: ${todoListsId}`);
				return prevTasksObj; // Возвращаем предыдущее состояние без изменений
			}

			const updatedTasks = tasks.map(
				task => (task.id === taskId ? { ...task, isDone } : task) // Создаем новый массив задач с обновленным статусом
			);

			return {
				...prevTasksObj,
				[todoListsId]: updatedTasks, // Обновляем только нужный список дел
			};
		});
	};

	const changeTaskTitle = (
		taskId: string,
		newTitle: string,
		todoListsId: string
	) => {
		setTasksObj(prevTasksObj => {
			const tasks = prevTasksObj[todoListsId];

			if (!tasks) {
				console.warn(`No tasks found for todo list ID: ${todoListsId}`);
				return prevTasksObj; // Возвращаем предыдущее состояние без изменений
			}

			const updatedTasks = tasks.map(
				task => (task.id === taskId ? { ...task, title: newTitle } : task) // Создаем новый массив задач с обновленным статусом
			);

			return {
				...prevTasksObj,
				[todoListsId]: updatedTasks, // Обновляем только нужный список дел
			};
		});
	};

	const addTask = (title: string, todoListsId: string) => {
		const task = { id: v1(), title, isDone: false };
		setTasksObj(prevTasksObj => ({
			...prevTasksObj,
			[todoListsId]: [task, ...(prevTasksObj[todoListsId] || [])],
		}));
	};

	const addTodoList = (title: string) => {
		const todoLists: TodoListType = {
			id: v1(),
			title,
			filter: 'all',
		};

		setTodoLists(prevTodoLists => [todoLists, ...prevTodoLists]);

		setTasksObj(prevTasksObj => ({
			...prevTasksObj,
			[todoLists.id]: [],
		}));
	};

	const changeFilter = (value: FilterValuesType, todoListsId: string) => {
		const updatedTodoLists = todoLists.map(tl =>
			tl.id === todoListsId ? { ...tl, filter: value } : tl
		);
		setTodoLists(updatedTodoLists);
	};

	const removeTodoList = (todoListsId: string) => {
		const filteredTodoList = todoLists.filter(tl => tl.id !== todoListsId);
		setTodoLists(filteredTodoList);

		delete tasksObj[todoListsId];
		setTasksObj({ ...tasksObj });
	};

	const changeTodoListTitle = (newTitle: string, todoListsId: string) => {
		const updatedTodoLists = todoLists.map(tl =>
			tl.id === todoListsId ? { ...tl, title: newTitle } : tl
		);
		setTodoLists(updatedTodoLists);
	};

	return (
		<div className='App'>
			<AppBar position='sticky'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						News
					</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>

			<Container fixed>
				<Grid container spacing={2} style={{ padding: '20px' }}>
					<AddItemForm addItem={addTodoList} />
				</Grid>
				<Grid container spacing={5}>
					{todoLists.map(tl => {
						let tasksForTodoList = tasksObj[tl.id];

						if (tl.filter === 'completed') {
							tasksForTodoList = tasksForTodoList.filter(
								task => task.isDone === true
							);
						}

						if (tl.filter === 'active') {
							tasksForTodoList = tasksForTodoList.filter(
								task => task.isDone === false
							);
						}
						return (
							<Paper
								style={{
									padding: '20px',
								}}
							>
								<TodoList
									key={tl.id}
									title={tl.title}
									todoListsId={tl.id}
									tasks={tasksForTodoList}
									filter={tl.filter}
									addTask={addTask}
									onClickClear={onClickClear}
									removeTodoList={removeTodoList}
									changeFilter={changeFilter}
									changeTaskTitle={changeTaskTitle}
									changeCheckboxStatus={changeCheckboxStatus}
									changeTodoListTitle={changeTodoListTitle}
								/>
							</Paper>
						);
					})}
				</Grid>
			</Container>
		</div>
	);
}

export default App;
