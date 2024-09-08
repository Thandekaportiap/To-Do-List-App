import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homelist = ({ userId }) => {
  console.log(userId);
  
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
console.log(todos)


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
    <div className='flex flex-col items-center justify-center p-6'>
      <h1 className='text-4xl '>Your Todo List</h1>
      <form onSubmit={handleAddTodo} className='mt-4 mb-6'>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
         required
            className="flex-1 px-3 py-2 border rounded"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
           className="px-3 py-2 border rounded"
        >
          <option >Low</option>
          <option >Medium</option>
          <option >High</option>
        </select>

        <button type="submit" className='bg-[green] text-[white] py-3 px-2 rounded-md'>Add Todo</button>
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTodos.length === 0 ? (
          <div className="col-span-3 text-center text-3xl text-[red]">No todos available that match your search. Add your first task!</div>
        ) : (
          filteredTodos.map((todo) => (
            <div key={todo.id} className="flex flex-col w-full p-8 rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-violet-500">
              <div className="flex-1">
                <h2 className="mb-6 text-3xl font-semibold">{todo.task}</h2>
                <div className="mx-7 badge badge-secondary"><p className="p-3 text-lg gray-500">Priority{todo.priority}</p></div>
              </div>
              <div className="mt-2">
                <button onClick={() => handleEditTodo(todo)} className="px-3 py-1 mr-5 text-white bg-green-500 rounded">Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)} className="px-3 py-1 text-white bg-red-500 rounded">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showEditForm && (
        <div className="mt-4 edit-form">
          <h2 className='text-xl font-semibold'>Edit Todo</h2>
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