// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// function DashboardPage() {
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useAuth();

//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const [editedTaskName, setEditedTaskName] = useState('');

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     setTasks(storedTasks);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   const addTask = () => {
//     if (!newTask.trim()) return;
//     const newTaskObj = {
//       id: Date.now(),
//       name: newTask,
//       status: 'todo'
//     };
//     setTasks(prev => [...prev, newTaskObj]);
//     setNewTask('');
//   };

//   const deleteTask = (id) => {
//     setTasks(prev => prev.filter(task => task.id !== id));
//   };

//   const editTask = (id, name) => {
//     setEditingTaskId(id);
//     setEditedTaskName(name);
//   };

//   const saveEditedTask = (id) => {
//     setTasks(prev => prev.map(task => task.id === id ? { ...task, name: editedTaskName } : task));
//     setEditingTaskId(null);
//     setEditedTaskName('');
//   };

//   const updateTaskStatus = (id, newStatus) => {
//     setTasks(prev => prev.map(task => task.id === id ? { ...task, status: newStatus } : task));
//   };

//   const categorizedTasks = {
//     todo: tasks.filter(task => task.status === 'todo'),
//     inprogress: tasks.filter(task => task.status === 'inprogress'),
//     completed: tasks.filter(task => task.status === 'completed')
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800">Welcome to Dashboard 👋</h1>
//         <button 
//           onClick={handleLogout} 
//           className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Add New Task */}
//       <div className="mb-8 flex gap-4 items-center">
//         <input 
//           type="text"
//           placeholder="Enter new task..."
//           className="flex-grow p-3 rounded-full border shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-300 outline-none"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <button 
//           onClick={addTask}
//           className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md"
//         >
//           Add
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-gray-700">{tasks.length}</h2>
//           <p className="text-gray-500">Total Tasks</p>
//         </div>
//         <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-gray-700">{categorizedTasks.inprogress.length}</h2>
//           <p className="text-gray-500">In Progress</p>
//         </div>
//         <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-gray-700">{categorizedTasks.completed.length}</h2>
//           <p className="text-gray-500">Completed</p>
//         </div>
//       </div>

//       {/* Tasks */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* To-Do */}
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ delay: 0.2 }}
//           className="bg-white p-6 rounded-2xl shadow-lg"
//         >
//           <h2 className="text-xl font-bold mb-4 text-blue-600 text-center">📋 To-Do</h2>
//           <div className="space-y-4">
//             {categorizedTasks.todo.map(task => (
//               <div key={task.id} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center">
//                 {editingTaskId === task.id ? (
//                   <>
//                     <input 
//                       value={editedTaskName}
//                       onChange={(e) => setEditedTaskName(e.target.value)}
//                       className="flex-grow bg-white p-1 rounded border mr-2"
//                     />
//                     <button 
//                       onClick={() => saveEditedTask(task.id)}
//                       className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full"
//                     >
//                       Save
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <span>{task.name}</span>
//                     <div className="flex gap-2">
//                       <button 
//                         onClick={() => updateTaskStatus(task.id, 'inprogress')}
//                         className="text-xs bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded-full"
//                       >
//                         Start
//                       </button>
//                       <button 
//                         onClick={() => editTask(task.id, task.name)}
//                         className="text-xs bg-blue-400 hover:bg-blue-500 px-2 py-1 rounded-full"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => deleteTask(task.id)}
//                         className="text-xs bg-red-400 hover:bg-red-500 px-2 py-1 rounded-full"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* In Progress */}
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ delay: 0.4 }}
//           className="bg-white p-6 rounded-2xl shadow-lg"
//         >
//           <h2 className="text-xl font-bold mb-4 text-yellow-600 text-center">🚧 In Progress</h2>
//           <div className="space-y-4">
//             {categorizedTasks.inprogress.map(task => (
//               <div key={task.id} className="p-3 bg-yellow-100 rounded-lg flex justify-between items-center">
//                 <span>{task.name}</span>
//                 <div className="flex gap-2">
//                   <button 
//                     onClick={() => updateTaskStatus(task.id, 'completed')}
//                     className="text-xs bg-green-400 hover:bg-green-500 px-2 py-1 rounded-full"
//                   >
//                     Complete
//                   </button>
//                   <button 
//                     onClick={() => deleteTask(task.id)}
//                     className="text-xs bg-red-400 hover:bg-red-500 px-2 py-1 rounded-full"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Completed */}
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ delay: 0.6 }}
//           className="bg-white p-6 rounded-2xl shadow-lg"
//         >
//           <h2 className="text-xl font-bold mb-4 text-green-600 text-center">✅ Completed</h2>
//           <div className="space-y-4">
//             {categorizedTasks.completed.map(task => (
//               <div key={task.id} className="p-3 bg-green-100 rounded-lg flex justify-between items-center">
//                 <span>{task.name}</span>
//                 <button 
//                   onClick={() => deleteTask(task.id)}
//                   className="text-xs bg-red-400 hover:bg-red-500 px-2 py-1 rounded-full"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;





//NEW CODE

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // 👉 Add this

function DashboardPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');

  // ✅ 1. Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  // ✅ 2. Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title: newTask,
        status: 'todo'
      });
      setTasks(prev => [...prev, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // ✅ 3. Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // ✅ 4. Start editing a task
  const editTask = (id, name) => {
    setEditingTaskId(id);
    setEditedTaskName(name);
  };

  // ✅ 5. Save edited task
  const saveEditedTask = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        title: editedTaskName
      });
      setTasks(prev => prev.map(task => task._id === id ? response.data : task));
      setEditingTaskId(null);
      setEditedTaskName('');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // ✅ 6. Update task status
  const updateTaskStatus = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        title: taskToUpdate.title,
        status: newStatus
      });
      setTasks(prev => prev.map(task => task._id === id ? response.data : task));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // ✅ Group tasks by status
  const categorizedTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    inprogress: tasks.filter(task => task.status === 'inprogress'),
    completed: tasks.filter(task => task.status === 'completed')
  };

  return (
    // 🖐️ Your full UI remains same here
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Dashboard 👋</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow"
        >
          Logout
        </button>
      </div>

      {/* Add New Task */}
      <div className="mb-8 flex gap-4 items-center">
        <input 
          type="text"
          placeholder="Enter new task..."
          className="flex-grow p-3 rounded-full border shadow-sm bg-gray-50 focus:ring-2 focus:ring-blue-300 outline-none"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button 
          onClick={addTask}
          className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md"
        >
          Add
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-700">{tasks.length}</h2>
          <p className="text-gray-500">Total Tasks</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-700">{categorizedTasks.inprogress.length}</h2>
          <p className="text-gray-500">In Progress</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-700">{categorizedTasks.completed.length}</h2>
          <p className="text-gray-500">Completed</p>
        </div>
      </div>

      {/* Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To-Do */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4 text-blue-600 text-center">📋 To-Do</h2>
          <div className="space-y-4">
            {categorizedTasks.todo.map(task => (
              <div key={task._id} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                {editingTaskId === task._id ? (
                  <>
                    <input 
                      value={editedTaskName}
                      onChange={(e) => setEditedTaskName(e.target.value)}
                      className="flex-grow bg-white p-1 rounded border mr-2"
                    />
                    <button 
                      onClick={() => saveEditedTask(task._id)}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{task.title}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateTaskStatus(task._id, 'inprogress')}
                        className="text-xs bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded-full"
                      >
                        Start
                      </button>
                      <button 
                        onClick={() => editTask(task._id, task.title)}
                        className="text-xs bg-blue-400 hover:bg-blue-500 px-2 py-1 rounded-full"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteTask(task._id)}
                        className="text-xs bg-red-400 hover:bg-red-500 px-2 py-1 rounded-full"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* In Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4 text-yellow-600 text-center">🚧 In Progress</h2>
          <div className="space-y-4">
            {categorizedTasks.inprogress.map(task => (
              <div key={task._id} className="p-3 bg-yellow-100 rounded-lg flex justify-between items-center">
                <span>{task.title}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateTaskStatus(task._id, 'completed')}
                    className="text-xs bg-green-400 hover:bg-green-500 px-2 py-1 rounded-full"
                  >
                    Complete
                  </button>
                  <button 
                    onClick={() => deleteTask(task._id)}
                    className="text-xs bg-red-400 hover:bg-red-500 px-2 py-1 rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Completed */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4 text-green-600 text-center">✅ Completed</h2>
          <div className="space-y-4">
            {categorizedTasks.completed.map(task => (
              <div key={task._id} className="p-3 bg-green-100 rounded-lg flex justify-between items-center">
                <span>{task.title}</span>
                <button 
                  onClick={() => deleteTask(task._id)}
                  className="text-xs bg-red-400 hover:bg-red-500 px-2 py-1 rounded-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default DashboardPage;
