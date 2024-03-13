import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getDay()];

  const addTodo = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: todo, status: false }]);
      setTodo('');
    } else {
      alert('Please type something.');
    }
  };

  const handleEdit = (id, newText) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {todos.map((obj) => (
          <div key={obj.id} className="todo">
            <div className="left">
              <input
                onChange={(e) => {
                  const status = e.target.checked;
                  setTodos(todos.map(todo => {
                    if (todo.id === obj.id) {
                      return { ...todo, status };
                    }
                    return todo;
                  }));
                }}
                value={obj.status}
                type="checkbox"
              />
              {obj.editing ? (
                <input
                  type="text"
                  value={obj.text}
                  onChange={(e) => handleEdit(obj.id, e.target.value)}
                  onBlur={() => setTodos(todos.map(todo => todo.id === obj.id ? { ...todo, editing: false } : todo))}
                  
                />
              ) : (
                <p>{obj.text}</p>
              )}
            </div>
            <div className="right">
              <i onClick={() => setTodos(todos.filter(todo => todo.id !== obj.id))} className="fas fa-times"></i>
              <i onClick={() => setTodos(todos.map(todo => todo.id === obj.id ? { ...todo, editing: true } : todo))} className="fas fa-edit"></i>
            </div>
          </div>
        ))}
      </div>
      <div className="taskCompleted" style={{ marginTop: '50px' }}>
        <h2>Task Completed</h2>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Date Completed</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((obj) => {
              if (obj.status) {
                return (
                  <tr key={obj.id}>
                    <td style={{ color: 'red' }}>{obj.text}</td>
                    <td style={{ color: 'red' }}>{currentDate.toLocaleDateString()}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
