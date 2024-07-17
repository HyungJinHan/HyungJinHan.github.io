import React from "react";
import TodoList from "../models/TodoList";
import { convertNumberToKorean } from "../utils/numberToKorean";
import Todo from "./Todo";

interface IProps {
  todos: TodoList;
  index: number;
  addTodo(TodoList: TodoList, message: string): void;
}

const Todos: React.FC<IProps> = ({ todos, index, addTodo }) => {
  return (
    <div className="todos">
      <h1 className="todos-title" children={convertNumberToKorean(index)} />

      <div className="todos-wrapper">
        {todos.getTodos().map((todo, idx) => (
          <Todo message={todo.getMessage()} key={idx} />
        ))}
      </div>

      <button
        className="button bottom-absolute"
        children="+"
        onClick={() => {
          addTodo(todos, `${todos.getTodos().length} 번째 테스트`);
        }}
      />
    </div>
  );
};

export default Todos;
