import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homelist = ({ userId }) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [priority, setPriority] = useState('medium');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/');
    } else {
      fetchTodos();
    }
  }, [userId]);

  useEffect(() => {
    setFilteredTodos(
      todos.filter(todo => 
        todo.task.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, todos]);

  const fetchTodos = async () => {
    const response = await fetch(`http://localhost:3001/api/todos/${userId}`);
    const data = await response.json();
    setTodos(data);
    setFilteredTodos(data);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!task) return;

    // Create a new Todo item
    const newTodo = { userId, task, priority };

    const response = await fetch('http://localhost:3001/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    if (response.ok) {
      const addedTodo = await response.json(); // Get the created todo (ensure your server returns the new todo)
      setTodos([...todos, { id: addedTodo.id, user_id: userId, task: newTodo.task, completed: 0 }]); // Add the new todo to the state
      setTask(''); // Clear the input field
    }
  };

  const handleEditTodo = (todo) => {
    setTask(todo.task);
    setPriority(todo.priority);
    setEditingId(todo.id);
    setShowEditForm(true);
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (!task) return;

    const response = await fetch(`http://localhost:3001/api/todos/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task, completed: 0 }), // assuming completed is 0 for updates
    });

    if (response.ok) {
      const updatedTodo = { id: editingId, task }; // Create updated todo object
      setTodos(todos.map(todo => (todo.id === editingId ? updatedTodo : todo))); // Update the state
      setTask('');
      setEditingId(null);
      setShowEditForm(false);
      setPriority('medium');
    }
  };

  const handleDeleteTodo = async (id) => {
    await fetch(`http://localhost:3001/api/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter(todo => todo.id !== id)); // Remove the todo from the state
  };

  return (
    <div className='flex flex-col justify-center items-center p-6'>
      <h1 className='text-4xl '>Your Todo List</h1>
      <form onSubmit={handleAddTodo} className='mb-6 mt-4'>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className='py-3 '
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button type="submit" className='bg-[green] text-[white] py-3 px-2 rounded-md'>Add Todo</button>
      </form>

      <table className="table-auto border-separate border-spacing-2 border border-fuchsia-400 p-6">
        <thead>
          <tr className='p-6'>
          <th>Priority</th>
            <th className=' border border-slate-300 bg-fuchsia-400 text-3xl'>Task</th>
            <th className=' border border-slate-300 bg-fuchsia-400 text-3xl'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', color:"red" }}>No todos available. Add your first task!</td>
            </tr>
          ) : (
            filteredTodos.map((todo) => (
              <tr key={todo.id}>
                    <td className='text-[black]'>{todo.priority}</td>
                <td className='text-3xl'>{todo.task}</td>
                <td className=''>
                  <button onClick={() => handleEditTodo(todo)} className='m-4 bg-[green] text-[white] py-2 px-2 rounded-md'>Edit</button>
                  <button onClick={() => handleDeleteTodo(todo.id)} className='bg-[red] text-[white] py-2 px-2 rounded-md'>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showEditForm && (
        <div className="edit-form mt-4">
          <h2 className='font-semibold text-xl'>Edit Todo</h2>
          <form onSubmit={handleUpdateTodo}>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Edit your task"
            />
             <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button type="submit" className='bg-[green] m-4 text-[white] py-2 px-2 rounded-md'>Update</button>
            <button type="button" onClick={() => { setShowEditForm(false); setEditingId(null); setTask(''); }} className='bg-[red] text-[white] py-2 px-2 rounded-md'>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Homelist