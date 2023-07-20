import React, { useEffect, useState } from 'react';
import { AreaChartOutlined, DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import "../resources/transaction.css";
import axios from 'axios';
import DefaultLayout from '../components/DefaultLayout';
import AddEditTransaction from '../components/AddEditTransaction';
import Spinner from '../components/Spinner';
import { Select, Table, message } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment/moment';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

function Home() {
  const [loading, setLoading] = useState(false);
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [selectedItemForEdit,setSelectedItemForEdit] = useState(null)
  const [transactionData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState("7")
  const [type, setType] = useState("all")
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType,setViewType] = useState("table")
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("money-manager-user"))
      setLoading(true);
      const response = await axios.post("/api/transaction/get-all-transaction", { userId: user._id ,frequency,...(frequency === "custom" && {selectedRange}),type})
      setTransactionData(response.data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something Went Wrong")
    }
  }
  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/transaction/delete-transaction", {transactionId: record._id})
      message.success("Trnsaction Deleted Successfully")
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something Went Wrong")
    }
  }
  useEffect(() => {
    getTransactions();
  }, [frequency,selectedRange,type])
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Catergory",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title:"Actions",
      dataIndex:"actions",
      render:(text,record) =>{
        return <div>
         <EditOutlined onClick = {()=>{
          setSelectedItemForEdit(record);
          setShowAddEditTransactionModal(true);
         }}/>
         <DeleteOutlined className='mx-2' onClick={() =>deleteTransaction(record) }/>
        </div>
      }
    }
  ]
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className='filter d-flex justify-content-between align-items-center'>
        <div className="d-flex left-header">
          <div className='d-flex flex-column frequency-filter'>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => { setFrequency(value) }}>
              <Select.Option value="7">Last 1 week</Select.Option>
              <Select.Option value="31">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency ==="custom" && (<div className="mt-2">
              <RangePicker value={selectedRange} onChange={(values)=>setSelectedRange(values)}/>
            </div>)}
          </div>
          <div className='d-flex flex-column type-filter'>
            <h6>Select Type</h6>
            <Select value={type} onChange={(type) => setType(type) }>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
              <Select.Option value="income">Income</Select.Option>
            </Select>
          </div>
        </div>
        <div className='d-flex right-header'>
          <div>
              <div className='view-switch mx-5'>
                    <UnorderedListOutlined className={viewType==="table" ? "active-icon mx-3" : "inactive-icon mx-3"} onClick={()=>setViewType("table")}/>
                    <AreaChartOutlined className={viewType==="analytics" ? "active-icon mx-3" : "inactive-icon mx-3"} onClick={()=>setViewType("analytics")}/>
              </div>
          </div>
          <button className='primary' onClick={() => { setShowAddEditTransactionModal(true) }}>Add New</button>
        </div>
      </div>
      <div className='table-analytics'>
        {viewType==="table" ? <div className='table'>
          <Table columns={columns} dataSource={transactionData} />
        </div>: <div><Analytics transactions = {transactionData}/></div>}
      </div>
      {showAddEditTransactionModal && <AddEditTransaction showAddEditTransactionModal={showAddEditTransactionModal} setShowAddEditTransactionModal={setShowAddEditTransactionModal} getTransactions={getTransactions} selectedItemForEdit={selectedItemForEdit} setSelectedItemForEdit={setSelectedItemForEdit}/>}
    </DefaultLayout>
  )
}

export default Home
