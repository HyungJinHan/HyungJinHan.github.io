/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./App.css";
import Todos from "./components/Todos";
import useTodo from "./hooks/useTodo";

const App = () => {
  const {
    todoListCollection,
    addTodo,
    addTodoList,
    allAddTodo,
    allRemoveTodo,
    rollback,
  } = useTodo();

  useEffect(() => {
    addTodoList();
  }, []);

  return (
    <div id="app">
      <div className="collection">
        {todoListCollection.map((todoList, index) => (
          <Todos
            todos={todoList}
            index={index + 1}
            addTodo={addTodo}
            key={index}
          />
        ))}
      </div>

      <div>
        <button
          className="button"
          children="콜렉션 추가"
          onClick={addTodoList}
        />
        <button
          className="button"
          children="전체 추가"
          onClick={() => allAddTodo("전체 추가")}
        />
        <button
          className="button"
          children="전체 삭제"
          onClick={() => allRemoveTodo()}
        />
        <button className="button" children="롤백" onClick={() => rollback()} />
      </div>

      <a
        href="https://github.com/HyungJinHan/design_pattern/tree/main/BehavioralPattern/Memento/memento-example"
        target="_blank"
        rel="noreferrer"
        children="GitHub로 이동"
      />
    </div>
  );
};

export default App;
