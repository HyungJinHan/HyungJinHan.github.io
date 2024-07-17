import React from "react";

interface IProps {
  message: string;
}

const Todo: React.FC<IProps> = ({ message }) => {
  return <div className="todo">{message}</div>;
};

export default Todo;
