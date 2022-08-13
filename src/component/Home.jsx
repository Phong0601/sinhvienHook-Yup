import React, { useState } from "react";
import From from "./From";
import User from "./User";

export default function Home() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const creatUser = (user) => {
    const foundPhone = userList.find((item) => {
      return user.phone === item.phone || user.email === item.email;
    });
    if (foundPhone) return alert("Email/Phone đã tồn tại");
    setUserList([...userList, user]);
  };
  const deleteUser = (id) => {
    const cloneDelete = [...userList];
    const index = cloneDelete.findIndex((item) => item.id === id);
    if (index !== -1) cloneDelete.splice(index, 1);
    setUserList(cloneDelete);
  };
  const getUpdate = (user) => {
    setSelectedUser(user);
  };
  const setUpdate = (user) => {
    const cloneUpdate = [...userList];
    const index = cloneUpdate.findIndex((item) => item.id === user.id);
    if (index !== -1) {
      cloneUpdate[index] = user;
    }
    setUserList(cloneUpdate);
    setSelectedUser(null);
  };
  return (
    <div>
      {/* <h1 style={{backgroundColor:'#000',color:'#fff',margin:'0'}}>Thông tin sinh viên</h1> */}
      <From
        setUpdate={setUpdate}
        setSelectedUser={selectedUser}
        creatUser={creatUser}
      />
      <User
        setSelectedUser={getUpdate}
        deleteUser={deleteUser}
        userList={userList}
      />
    </div>
  );
}
