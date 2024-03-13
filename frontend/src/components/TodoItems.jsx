import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteTodo } from "../apiCalls/todo";

const TodoItems = ({ item }) => {
  console.log(item);
  const navigate = useNavigate();

  const deleteHandler = async () => {
    if (window.confirm("Are you sure?")) {
      const response = await deleteTodo(item._id);

      if (response.status === 200) {
        alert(response.data.msg);
        window.location.reload();
      } else {
        alert(response.response.data.msg);
      }
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{item.title}</td>
      <td className="border px-4 py-2">{item.description}</td>
      <td className="border px-4 py-2">
        {item.completed ? "Completed" : "Not Completed"}
      </td>
      <td className="border px-4 py-2">
        {" "}
        <button
          onClick={() => navigate(`/todo/view/${item._id}`)}
          className="bg-blue-500 text-white px-2 rounded"
        >
          View
        </button>
      </td>
      <td className="border px-4 py-2">
        {" "}
        <button
          onClick={() => navigate(`/todo/update/${item._id}`)}
          className="bg-green-500 text-white px-2 rounded"
        >
          Update
        </button>
      </td>
      <td className="border px-4 py-2">
        {" "}
        <button
          onClick={deleteHandler}
          className="bg-red-600 text-white px-2 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItems;
