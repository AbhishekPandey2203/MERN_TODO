import React, { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../apiCalls/todo";

const UpdateTodo = () => {
  const { todo, setTodo } = useContext(TodoContext);
  const { id } = useParams();
  const myTodo = todo.find((todo) => todo._id === id);

  const [title, setTitle] = useState(myTodo.title);
  const [description, setDescription] = useState(myTodo.description);

  const [completed, setCompleted] = useState(myTodo.completed);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      completed,
    };
    const response = await updateTodo(id, data);
    if (response.status === 200) {
      alert(response.data.msg);
      navigate("/");
    } else {
      alert(response.response.data.msg);
    }
  };

  return (
    <div className="w-1/4 m-auto text-center">
      <h1 className=" text-3xl my-3 font-bold">Update Todo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter Title.."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <textarea
            className="focus:outline-none border-none p-2 rounded w-full"
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <select
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
            className="focus:outline-none border-none p-2 rounded w-full"
          >
            <option value="false">Not Completed</option>

            <option value="true">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
