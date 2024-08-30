import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homelist = () => {

  const [users, setUsers] = useState([]);
    const [name, setname] = useState('');
    const [date, setDate] = useState('');
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(''); // Track input value for user ID
    const [editUserId, setEditUserId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editDate, setEditDate] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []); // Run only once on component mount

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3002/todos');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3002/todos/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        }
    };

    const addUser = async () => {
        try {
            await axios.post('http://localhost:3002/todos', { name, date });
            setname('');
            setDate('');
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const updateUser = async (id) => {
        try {
            await axios.put(`http://localhost:3002/todos/${id}`, { name: editName, date: editDate });
            setEditUserId(null);
            setEditName('');
            setEditDate('');
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/todos/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditClick = (user) => {
        setEditUserId(user.id);
        setEditName(user.name);
        setEditDate(user.date);
    };

   
  return (
   <>
  <section className='flex flex-col items-center justify-center bg-green200'>

  <div>
            <h1>Todo Lists</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {editUserId === user.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={editDate}
                                    onChange={(e) => setEditDate(e.target.value)}
                                />
                                <button onClick={() => updateUser(user.id)}>Update</button>
                                <button onClick={() => setEditUserId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {user.name} - {user.date}
                                <button onClick={() => handleEditClick(user)}>Edit</button>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Add Tasks</h2>
            <input
                type="text"
                placeholder="Task"
                value={name}
                onChange={(e) => setname(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={addUser}>Add</button>
            <h2>Get Task by ID</h2>
            <input
                type="number"
                placeholder="Task ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={() => fetchUser(userId)}>Fetch User</button>
            {user && (
                <div>
                    <h3>User Details</h3>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.name}</p>
                </div>
            )}
            <h2>Delete Task by ID</h2>
            <input
                type="number"
                placeholder="Task ID"
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={() => deleteUser(userId)}>Delete</button>
        </div>

  </section>
   </>
  )
}

export default Homelist
