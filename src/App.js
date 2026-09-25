import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Board } from "./components/Board";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TaskDetails } from "./components/TaskDetails";
import { COLUMNS, loadBoard, STORAGE_KEY } from "./board-data";

const createTaskId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const App = () => {
  const [board, setBoard] = useState(loadBoard);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  const tasksById = useMemo(() => (
    Object.values(board).flat().reduce((tasks, task) => ({ ...tasks, [task.id]: task }), {})
  ), [board]);

  const addTask = (title) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return false;
    }

    setBoard((currentBoard) => ({
      ...currentBoard,
      backlog: [...currentBoard.backlog, {
        id: createTaskId(), title: trimmedTitle, description: "",
      }],
    }));
    return true;
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    setBoard((currentBoard) => {
      const task = currentBoard[fromColumn].find((item) => item.id === taskId);

      if (!task) {
        return currentBoard;
      }

      return {
        ...currentBoard,
        [fromColumn]: currentBoard[fromColumn].filter((item) => item.id !== taskId),
        [toColumn]: [...currentBoard[toColumn], task],
      };
    });
  };

  const updateDescription = (taskId, description) => {
    setBoard((currentBoard) => Object.fromEntries(
      Object.entries(currentBoard).map(([columnId, tasks]) => [
        columnId,
        tasks.map((task) => (task.id === taskId ? { ...task, description } : task)),
      ])
    ));
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<Board board={board} addTask={addTask} moveTask={moveTask} />}
          />
          <Route
            path="/tasks/:taskId"
            element={<TaskDetails tasksById={tasksById} updateDescription={updateDescription} />}
          />
        </Routes>
      </main>
      <Footer
        activeTasks={board.backlog.length}
        finishedTasks={board.finished.length}
      />
    </div>
  );
};

export default App;
