import React, { useEffect, useState } from "react";
import { Table, Card, Button, Input } from "antd";

function User(props) {
  const { Search } = Input;
  const columns = [
    {
      title: "Mã SV",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên SV ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SĐT SV",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chức Năng",

      key: "action",
      render: (_, btn) => {
        return (
          <>
            <Button
              onClick={() => {
                props.setSelectedUser(btn);
              }}
              style={{ marginRight: "10px" }}
              type="primary"
              danger
            >
              Sửa
            </Button>

            <Button
              onClick={() => {
                props.deleteUser(btn.id);
              }}
              type="primary"
            >
              Xóa
            </Button>
          </>
        );
      },
    },
  ];
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    setSearchList([...props.userList]);
  }, [props.userList]);
  const handleSearch = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      return setSearchList([...props.userList]);
    } else {
      const resuilt = props.userList.filter((item) => {
        return  item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.phone.includes(e.target.value)  || String(item.id).includes(e.target.value);
      });
      setSearchList(resuilt);
    }
  };
  return (
    <Card
      title="Thông tin"
      headStyle={{
        fontSize: "20px",
        backgroundColor: "#000",
        color: "#fff",
        margin: "0",
      }}
    >
      <Search
        style={{width:'30%',border:'10px',marginBottom:'10px'}}
        placeholder="Search Id or Name or Phone "
        allowClear
        enterButton="Search"
        size="large"
        onChange={handleSearch}
      />
      <Table  
        dataSource={searchList.map((user) => {
          return { ...user, key: user.id };
        })}
        columns={columns}
      ></Table>
    </Card>
  );
}

export default User;
