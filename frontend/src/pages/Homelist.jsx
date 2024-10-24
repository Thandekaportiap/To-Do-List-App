import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Homelist = ({ userId }) => {
  console.log(userId);
  
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [priority, setPriority] = useState('medium');
  const [searchTerm, setSearchTerm] = useState('');
  const [description, setDescription] = useState('');
  const [priorityDate, setPriorityDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

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
  try {
    const response = await fetch(`https://to-do-list-app-3-c106.onrender.com/todos/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    const data = await response.json();
    setTodos(data);
    setFilteredTodos(data);
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Could not fetch todos. Please try again later.', 'error');
  }
};


const handleAddTodo = async (e) => {
  e.preventDefault();
  if (!task) return;

  const newTodo = { userId, task, description, priority, priorityDate };

  try {
    const response = await fetch(`https://to-do-list-app-3-c106.onrender.com/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) throw new Error('Failed to add todo');
    const addedTodo = await response.json();
    setTodos([...todos, { id: addedTodo.id, ...newTodo }]);
    setTask('');
    setDescription('');
    setPriority('medium');
    setPriorityDate('');
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Could not add todo. Please try again later.', 'error');
  }
};

  const handleEditTodo = (todo) => {
    setTask(todo.task);
    setDescription(todo.description); 
    setPriority(todo.priority);
    setPriorityDate(todo.priorityDate);
    setEditingId(todo.id);
    setShowEditForm(true);
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (!task || !description || !priority || !priorityDate) return;
  
    try {
      const response = await fetch(`https://to-do-list-app-3-c106.onrender.com/api/todos/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task, description, priority, priorityDate }),
      });
  
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = { id: editingId, task, description, priority, priorityDate };
      setTodos(todos.map(todo => (todo.id === editingId ? updatedTodo : todo)));
      setTask('');
      setDescription('');
      setEditingId(null);
      setShowEditForm(false);
      setPriority('medium');
      setPriorityDate('');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Could not update todo. Please try again later.', 'error');
    }
  };
  const handleDeleteTodo = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://to-do-list-app-3-c106.onrender.com/api/todos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete todo');
        setTodos(todos.filter(todo => todo.id !== id));
        Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Could not delete todo. Please try again later.', 'error');
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-6 bg-gradient-to-r from-violet-500 to-fuchsia-500'>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
        className="border rounded px-6 py-2 mb-4"
      />
      
      <h1 className='text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-800'>Your Todo List</h1>
      {showAddForm ? (
      <form onSubmit={handleAddTodo} className='mt-4 mb-6 p-4 bg-zinc-300 rounded-xl w-6/12'>
      <div className="flex flex-col space-x-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Task"
            required
            className="border rounded px-3 py-2 flex-1 mx-4 my-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border rounded px-3 py-2 flex-1 mx-4 my-2"
          />
          <input
            type="date"
            value={priorityDate}
            onChange={(e) => setPriorityDate(e.target.value)}
            className="border rounded px-3 py-2 mx-4 my-2"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded px-3 py-2 mx-4 my-2"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" className="bg-[green] text-white rounded px-4 py-2 mx-4 my-2">Add Todo</button>
        </div>
      </form>
      ) : (
      <button onClick={() => setShowAddForm(true)} type="submit" className="bg-[green] text-white rounded px-4 py-2 mx-4 my-2">Add Todo</button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center col-span-3 text-2xl">No todos available that match your search. Add your first task!</div>
        ) : (
          filteredTodos.map((todo) => {
            let bgColor; 

            if (todo.priority === 'high') {
              bgColor = 'bg-red-500';
            } else if (todo.priority === 'medium') {
              bgColor = 'bg-orange-500';
            } else {
              bgColor = 'bg-green-500';
            }

            return (
              <div key={todo.id} className={`p-4 rounded-lg shadow-md flex flex-col ${bgColor} `}>
                <div className="flex-1 px-6">
                  <h2 className="text-3xl font-semibold py-2">{todo.task}</h2>
                  <p className="text-xl py-2"> {todo.description}</p>
                  {/* <p className="text-sm">Priority: {todo.priority}</p> */}
                  <p className="text-xl py-2">Date: {todo.priorityDate}</p>
                </div>
                <div className="mt-2 px-6">
                  <button onClick={() => handleEditTodo(todo)} className="bg-[green] text-white rounded px-2 py-1 mr-4">Edit</button>
                  <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-700 text-white rounded px-2 py-1">Delete</button>
                </div>
              </div>
            );
          })
        )}
      </div>


      {showEditForm && (
  <div className="bg-gray-200 p-4 rounded mt-4">
    <h2 className="text-lg font-semibold">Edit Todo</h2>
    <form onSubmit={handleUpdateTodo}  className='flex flex-col'>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Edit your task"
        className="border rounded px-3 py-2 mb-2 flex-1"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Edit description"
        className="border rounded px-3 py-2 mb-2 flex-1"
      />
      <input
        type="date"
        value={priorityDate}
        onChange={(e) => setPriorityDate(e.target.value)}
        className="border rounded px-3 py-2 mb-2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border rounded px-3 py-2 mb-2"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Update Todo</button>
        <button
          type="button"
          onClick={() => {
            setShowEditForm(false);
            setEditingId(null);
            setTask('');
            setDescription('');
            setPriority('medium');
            setPriorityDate('');
          }}
          className="bg-gray-400 text-white rounded px-4 py-2 ml-2"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}
    </div>
  );
};

export default Homelist