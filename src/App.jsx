import { useState } from 'react';
import './app.css';

export default function App() {
  const [state, setState] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const addTask = () => {
    if (!state) return;

    if (isEditing) {
      setList(list.map(task =>
        task.id === editingId ? { ...task, text: state } : task
      ));
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newTask = {
        id: Math.random(),
        text: state,
      };
      setList([...list, newTask]);
    }

    setState('');
  };

  const deleteTask = (id) => {
    setList(list.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const task = list.find((task) => task.id === id);
    if (task) {
      setState(task.text);
      setIsEditing(true);
      setEditingId(id);
    }
  };

  const element = (
    <h1 className='text-white font-bold text-3xl text-center mt-11'>Enter Daily Task</h1>
  );

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="phone flex flex-col">
          <div className="screen bg-gray-800">
            <div className='flex flex-col rounded-xl text-center gap-6 items-center p-8 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat'
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}>

              {element}

              <div className="flex gap-4 items-center w-full max-w-lg">
                <input
                  className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full shadow-sm"
                  type="text"
                  value={state}
                  placeholder="Enter a new task"
                  onChange={(e) => setState(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && addTask()}
                />
                <button
                  className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition duration-300 shadow-md"
                  type="button"
                  onClick={addTask}
                >
                  {isEditing ? 'Edit' : 'Add'}
                </button>
              </div>

              <div className='w-full max-w-lg mt-4'>
                <ul className='w-full'>
                  {list.map((item) => (
                    <li className='text-sm flex items-center gap-4 mt-2 border border-gray-300 rounded-lg px-3 py-1 backdrop-blur-lg text-white shadow-lg' key={item.id}>
                      <span className='text-left'>{item.text}</span>
                      <button
                        className='bg-red-500 text-white ml-auto rounded-lg px-4 py-2 hover:bg-red-600 transition duration-300 shadow-sm'
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-300 shadow-sm'
                        onClick={() => editTask(item.id)}
                      >
                        Edit
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
