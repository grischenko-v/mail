import React from 'react';
import {Button, Modal, Form, Input, Select} from 'antd';
import './App.css';

const {Option} = Select;
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

function FormModal(props) {
	return (
		<Modal
			title={props.modalTitle}
			visible={props.isModalOpen}
			onCancel={props.onModalClose}
			destroyOnClose={true}
			footer={null}>
			<Form
				{...layout}
				name="basic"
				initialValues={{name: props.currentItem.name, roles: props.currentItem.roles}}
				onFinish={props.onFormSubmit}>

				<Form.Item
					label="Name"
					name="name"
					rules={[{required: true, message: 'Please input name!'}]}>
					<Input/>
				</Form.Item>

				<Form.Item
					label="Roles"
					name="roles"
					rules={[{required: true, message: 'Please input roles!'}]}>
					<Select
						placeholder="Select a rolee"
						allowClear
						mode="multiple"
						value={props.currentItem.roles}>
						<Option value="admin">admin</Option>
						<Option value="user">user</Option>
						<Option value="guest">guest</Option>
					</Select>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default FormModal;