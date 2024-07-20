import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodo } from "../apiCalls/todo";

const ViewTodo = () => {
  const [todo, setTodo] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTodo(id);

      if (response.status === 200) {
        setTodo(response.data.todo);
      } else {
        alert(response.response.data.msg);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="text-cente bg-slate-200 w-3/4 m-auto rounded py-4 mt-5">
      {todo && (
        <div>
          <h1 className="text-3xl text-center font-semibold my-7 ">
            Title:{todo.title}
          </h1>
          <h2 className="text-3xl text-center font-semibold my-7">
            {" "}
            Completed: {todo.completed ? "Completed" : "Not Completed"}
          </h2>
          <p className="text-2xl text-center font-semibold my-7">
            Description:{todo.description}
          </p>
          <p className="text-2xl text-center font-semibold my-7">
            Created:{formatDate(todo.createdAt)}
          </p>
          <p className="text-2xl text-center font-semibold my-7">
            Updated:{formatDate(todo.updatedAt)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewTodo;
