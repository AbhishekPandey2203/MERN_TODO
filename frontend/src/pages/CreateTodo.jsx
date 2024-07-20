import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../apiCalls/todo";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     title,
  //     description,
  //   };

  //   const response = await createTodo(data); // this is a error point // video time 1.28.50 createtodo

  //   if (response.status === 201) {
  //     alert("Todo Created");
  //     navigate("/");
  //   } else {
  //     alert(response.response.data.msg);
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
    };
    console.log(data);

    try {
      const response = await createTodo(data);

      if (response && response.status === 201) {
        alert("Todo Created");
        navigate("/");
      } else {
        alert("Failed to create todo"); // Default message if status is not 201
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Failed to create todo"); // Default message if an error occurs
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Write Task</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter Task.."
            className="focus:outline-none border-none p-2 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <textarea
            className="focus:outline-none border-none p-2 rounded w-full"
            placeholder="Description.."
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
