import React, { useState, useEffect } from "react";
import db from "../../utils/db";
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const addTodo = async () => {
    if (task.trim() !== "") {
      const newTodo = { task };
      await db.todos.add(newTodo);
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  const deleteTodo = async (id) => {
    await db.todos.delete(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const fetchData = async () => {
      const todosFromDB = await db.todos.toArray();
      setTodos(todosFromDB);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-md p-12">
        <div className="join">
          <input
            type="text"
            placeholder="Add a new todo..."
            className="input input-bordered join-item w-full max-w-xs"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTodo} className="btn btn-primary join-item">
            Add Todo
          </button>
        </div>

        <div className="mt-4">
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="join flex w-full max-w-xs items-center justify-between border pl-2"
              >
                <span className="join-item text-wrap">{todo.task}</span>
                <button
                  className="btn btn-error join-item w-20 max-w-xs"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TodoList;
