import React, {useEffect, useState} from 'react';
import {Table, Tag, Button} from 'antd';
import ModalForm from './ModalForm';
import './App.css';

const getcolumns = () => [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Roles',
		dataIndex: 'roles',
		key: 'roles',
		render: roles => (
			<>
				{roles.map((role, index) => {
					let color = 'red';
					if (role === 'admin') {
						color = 'green';
					} else if (role === 'user') {
						color = 'blue';
					}

					return (
						<Tag color={color} key={role + index}>
							{role}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Actions',
		dataIndex: '',
		key: 'x',
		render: () => <>
			<Button type="primary" data-type="edit">Edit</Button>
			<Button type="error" data-type="delete">Delete</Button>
		</>
	},
];

const baseUrl = "/api/users";

const initialItem = {roles: [], name: [], id: null, key: null};

function App() {

	const [data, setData] = useState({});
	const [isVisible, setVisible] = useState(false);
	const [isModalOpen, setModalVisible] = useState(false);
	const [currentItem, setCurrentItem] = useState(initialItem);
	const [modalTitle, setModalTitle] = useState('Add user');

	useEffect(() => {
		fetch(baseUrl)
			.then(res => res.json())
			.then(json => {
				setData(json.users);
				setVisible(true);
			})
	}, []);

	function onEdit(id) {
		const item = data.filter(item => item.id === id)[0];
		setModalTitle('Edit user');
		setCurrentItem(item);
		setModalVisible(true);
	}

	function onDelete(id) {
		fetch(baseUrl + '/' + id, {
			method: 'DELETE'
		})
		.catch(e => console.log(e))
		.finally(() => setModalVisible(false));
	}

	function onAdd() {
		setModalTitle('Add user');
		setCurrentItem(initialItem);
		setModalVisible(true);
	}

	function onClickRow(record) {
		return {
			onClick: (e) => {
				// ужсаное решение на скорую руку
				const type = e.target?.closest('button')?.dataset?.type;
				if (type === 'edit') {
					onEdit(record.id)
				} else if (type === 'delete') {
					onDelete(record.id)
				}
			}
		}
	}

	function onModalClose() {
		setModalVisible(false);
		setCurrentItem(initialItem);
	}

	function onFormSubmit(value) {
		const url = currentItem.id ? baseUrl + '/' + currentItem.id : baseUrl;
	
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(value)
		})
		.then(response => response.json())
		.catch(e => console.log(e))
		.finally(() => setModalVisible(false));
	}

	return (
		<div className='main'>
			{currentItem.role}
			<Button type="primary" onClick={onAdd}>Add</Button>
			{isVisible && <Table dataSource={data}
								 onRow={onClickRow}
								 columns={getcolumns()}/>}

			<ModalForm
				modalTitle={modalTitle}
				isModalOpen={isModalOpen}
				onModalClose={onModalClose}
				currentItem={currentItem}
				onFormSubmit={onFormSubmit}/>
		</div>
	);
}

export default App;
