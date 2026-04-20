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

  const handleCreate = async () => {
    if (!title) return;

    await createTaskAPI({
      title,
      projectId,
    });

    setTitle("");
    loadTasks();
  };

  const moveTask = async (taskId: string, status: Task["status"]) => {
    await updateTaskAPI(taskId, { status });
    loadTasks();
  };

  const columns: Task["status"][] = ["todo", "inprogress", "done"];

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6">Project Board</h2>

      {/* Create Task */}
      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none 
                     focus:ring-2 focus:ring-blue-500
                     dark:bg-gray-800 dark:border-gray-700"
        />

        <button
          onClick={handleCreate}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 min-h-[400px]"
          >
            <h3 className="text-lg font-semibold mb-4 capitalize">
              {col}
            </h3>

            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === col)
                .map((task) => {
                  const taskId = task._id || task.id!;

                  return (
                    <div
                      key={taskId}
                      className="p-4 bg-white dark:bg-gray-900 
                                 border border-gray-200 dark:border-gray-700
                                 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <p className="mb-3 font-medium">{task.title}</p>

                      <div className="flex flex-wrap gap-2">
                        {col !== "todo" && (
                          <button
                            onClick={() => moveTask(taskId, "todo")}
                            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300"
                          >
                            Todo
                          </button>
                        )}

                        {col !== "inprogress" && (
                          <button
                            onClick={() =>
                              moveTask(taskId, "inprogress")
                            }
                            className="text-xs px-2 py-1 bg-yellow-200 dark:bg-yellow-700 rounded hover:bg-yellow-300"
                          >
                            In Progress
                          </button>
                        )}

                        {col !== "done" && (
                          <button
                            onClick={() => moveTask(taskId, "done")}
                            className="text-xs px-2 py-1 bg-green-200 dark:bg-green-700 rounded hover:bg-green-300"
                          >
                            Done
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}