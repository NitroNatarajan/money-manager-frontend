import React, { useState } from 'react';
import { Form, Input, Modal, Select, message } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import Spinner from './Spinner';
function AddEditTransaction({showAddEditTransactionModal,setShowAddEditTransactionModal, getTransactions,selectedItemForEdit,setSelectedItemForEdit}) {
    const [loading, setLoading] = useState(false);
  const onFinish = async(values) =>{
    try {
        const user = JSON.parse(localStorage.getItem("money-manager-user"))
        setLoading(true);
        if(selectedItemForEdit){
          await axios.post("/api/transaction/edit-transaction",{payload: {...values,userId: user._id }, transactionId:selectedItemForEdit._id})
          getTransactions();
          message.success("Transaction Updated successfully")
        }
        else{
          await axios.post("/api/transaction/add-transaction",{...values,userId: user._id})
          getTransactions();
          message.success("Transaction added successfully")
        }
        setShowAddEditTransactionModal(false)
        setSelectedItemForEdit(null)
        setLoading(false);
        
      } catch (error) {
        setLoading(false)
       message.error("Something went wrong")
      }
  }
  return (
    <Modal title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"} open={showAddEditTransactionModal} 
    onCancel={() => setShowAddEditTransactionModal(false)} 
    footer={false}>
        {loading && <Spinner />}
        <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit}> 
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select the category of the transaction"
            >
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select the category of income and expenses"
            >
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelancing</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="housing">Housing and House-Holding</Select.Option>
              <Select.Option value="foodAndClothes">Food and Clothes</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button className='primary add-new' type='submit'>Save</button>
          </div>
        </Form>
      </Modal>
  )
}

export default AddEditTransaction