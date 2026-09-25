export const STORAGE_KEY = "awesome-kanban-board";

export const COLUMNS = [
  { id: "backlog", title: "Backlog", previousColumn: null },
  { id: "ready", title: "Ready", previousColumn: "backlog" },
  { id: "progress", title: "In progress", previousColumn: "ready" },
  { id: "finished", title: "Finished", previousColumn: "progress" },
];

const createTask = (id, title, description = "") => ({
  id,
  title,
  description,
});

export const initialBoard = {
  backlog: [
    createTask("backlog-1", "Login page – performance issues"),
    createTask("backlog-2", "Sprint bugfix"),
  ],
  ready: [
    createTask("ready-1", "Shop page – performance issues"),
    createTask("ready-2", "Checkout bugfix"),
  ],
  progress: [
    createTask("progress-1", "User page – performance issues"),
    createTask("progress-2", "Auth bugfix"),
  ],
  finished: [
    createTask(
      "finished-1",
      "Main page – performance issues",
      "Конец уже содержится в начале.",
    ),
    createTask("finished-2", "Main page bugfix"),
  ],
};

export const loadBoard = () => {
  try {
    const savedBoard = localStorage.getItem(STORAGE_KEY);
    return savedBoard ? JSON.parse(savedBoard) : initialBoard;
  } catch {
    return initialBoard;
  }
};
