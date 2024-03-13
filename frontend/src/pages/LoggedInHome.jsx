import React from 'react';
import TodoList from '../components/TodoList';

const LoggedInHome = () => {
  return (
    <div className='w-5/6 m-auto text-center'>
      <h1 className='text-center text-3xl mb-4'>View Todo</h1>
      <TodoList/>
      
    </div>
  );
}

export default LoggedInHome;
