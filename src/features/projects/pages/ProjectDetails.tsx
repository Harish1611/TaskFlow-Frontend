import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTasksAPI,
  createTaskAPI,
  updateTaskAPI,
} from "../../tasks/api";

type Task = {
  _id?: string;
  id?: string;
  title: string;
  status: "todo" | "inprogress" | "done";
};

export default function ProjectDetails() {
  const { id: projectId } = useParams();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    try {
      const res = await getTasksAPI(projectId!);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (projectId) loadTasks();
  }, [projectId]);

  // ➕ Create Task
  const handleCreate = async () => {
    if (!title) return;

    await createTaskAPI({
      title,
      projectId,
    });

    setTitle("");
    loadTasks();
  };

  // Move Task
  const moveTask = async (taskId: string, status: Task["status"]) => {
    await updateTaskAPI(taskId, { status });
    loadTasks();
  };

  const columns: Task["status"][] = ["todo", "inprogress", "done"];

  return (
    <div style={{ padding: 20 }}>
      <h2>Project Board</h2>

      {/* Create Task */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={handleCreate}>Add Task</button>
      </div>

      {/* Kanban Board */}
      <div style={{ display: "flex", gap: 20 }}>
        {columns.map((col) => (
          <div
            key={col}
            style={{
              flex: 1,
              padding: 10,
              border: "1px solid #ccc",
              minHeight: 300,
            }}
          >
            <h3 style={{ textTransform: "capitalize" }}>{col}</h3>

            {tasks
              .filter((task) => task.status === col)
              .map((task) => {
                const taskId = task._id || task.id!;

                return (
                  <div
                    key={taskId}
                    style={{
                      padding: 10,
                      marginBottom: 10,
                      border: "1px solid #999",
                      background: "#f9f9f9",
                    }}
                  >
                    <p>{task.title}</p>

                    {/* Move Buttons */}
                    <div style={{ display: "flex", gap: 5 }}>
                      {col !== "todo" && (
                        <button onClick={() => moveTask(taskId, "todo")}>
                          Todo
                        </button>
                      )}
                      {col !== "inprogress" && (
                        <button
                          onClick={() => moveTask(taskId, "inprogress")}
                        >
                          In Progress
                        </button>
                      )}
                      {col !== "done" && (
                        <button onClick={() => moveTask(taskId, "done")}>
                          Done
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}