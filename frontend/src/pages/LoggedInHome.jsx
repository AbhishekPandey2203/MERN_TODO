import React from 'react';
import TodoList from '../components/TodoList';

const LoggedInHome = () => {
  return (
    <div className='w-5/6 m-auto text-center'>
      <h1 className="text-3xl text-center font-semibold my-7">Your Task List</h1>
      <TodoList/>
      
    </div>
  );
}

export default LoggedInHome;
