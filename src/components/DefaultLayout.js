import React from 'react'
import "../resources/default-layout.css";
import { Button, Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
function DefaultLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("money-manager-user"));
  const navigate = useNavigate();

  const items = [
    {
      key: '1',
      label: (
       <li onClick={()=> {
        localStorage.removeItem("money-manager-user")
        navigate("/login")
       }} className="logout">Logout</li>
      ),
    }
  ];
  return (
    <div className="layout">
      <div className='header d-flex justify-content-between align-items-center'>
        <div>
          <h1 className='logo'>Money 💸 Manager</h1>
        </div>
        <div>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
              >
                <button className="secondary username">{user.name}</button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>
      <div className='content'>
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout
