import React, { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import { v4 as uuidv4 } from 'uuid';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';

function App() {
  
  /* const usersData = [
    { id: uuidv4(), name: 'Tania', username: 'floppydiskette' },
    { id: uuidv4(), name: 'Craig', username: 'siliconeidolon' },
    { id: uuidv4(), name: 'Ben', username: 'benisphere' },
  ] */
  
  //state
  const [users, setUsers] = useState( () => {
    const saveData = window.localStorage.getItem('crudData');
    if(saveData){
      return JSON.parse(saveData)
    } else {
      return []
    }
  });

  useEffect(() => {
    window.localStorage.setItem('crudData', JSON.stringify(users))
  }, [users])

  //add user function
  const addUser = (user) => {
    user.id = uuidv4()
    setUsers([
      ...users,
      user
    ])
  }

  //delete users

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  //edit users
   const [editing, setEditing] = useState(false);
   const [currentUser, setCurrentUser] = useState({
    id: null, name: '', username: ''
   })

   const editRow = (user) => {
    setEditing(true)
    setCurrentUser({
      id: user.id, name: user.name, username: user.username
    })
   }

   const updateUser = (id, updatedUser) => {
    setEditing(false)
    setUsers(users.map(user => user.id === id ? updatedUser : user))
   }
  
  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          
          {
            editing ? (
              <div>
                <h2>Edit user</h2>
                <EditUserForm currentUser={currentUser} updateUser={updateUser}/>
              </div>
            ) : (
              <div>
                <h2>Add user</h2>
                <AddUserForm addUser={addUser}/>
              </div>
            )
          }
          
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} setEditing={setEditing} editRow={editRow} currentUser={currentUser}/>
        </div>
      </div>
    </div>
  );
}

export default App;
