import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editTodo, setEditTodo] = useState("");

  const AddTodoTask = () => {
    if (todo.trim() !== "") {
      setTodoList([...todoList, todo]);
      setTodo("");
    }
  };

  const handleDelete = (index) => {
    const newList = todoList.filter((_, i) => i !== index);
    setTodoList(newList);
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditTodo(todoList[index]);
  };

  const handleEditSubmit = (index) => {
    const updatedTodos = todoList.map((task, i) =>
      i === index ? editTodo : task
    );
    setTodoList(updatedTodos);
    setIsEditing(null);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Todo Application</h1>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your tasks"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="input-box"
          />
          <button onClick={AddTodoTask} className="add-btn">
            Add Task
          </button>
        </div>
        <div className="todo-list">
          <h3>Todo List</h3>
          {todoList.length > 0 ? (
            <ul>
              {todoList.map((task, index) => (
                <div key={index} className="todo-item">
                  {isEditing === index ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        className="edit-input"
                      />
                      <button onClick={() => handleEditSubmit(index)} className="submit-btn">
                        Submit
                      </button>
                    </div>
                  ) : (
                    <li>{task}</li>
                  )}
                  <div className="icons">
                    <button onClick={() => handleEdit(index)} className="edit-btn">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(index)} className="delete-btn">
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p>No tasks added yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
