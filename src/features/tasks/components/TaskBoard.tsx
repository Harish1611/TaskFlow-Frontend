import { useEffect, useState } from "react";
import { getTasksAPI, updateTaskAPI } from "../api";

export default function TaskBoard({ projectId }: any) {
  const [tasks, setTasks] = useState<any[]>([]);

  const load = async () => {
    const res = await getTasksAPI(projectId);
    setTasks(res.data);
  };

  const move = async (id: string, status: string) => {
    await updateTaskAPI(id, { status });
    load();
  };

  useEffect(() => {
    load();
  }, [projectId]);

  const columns = ["todo", "inprogress", "done"];

  const statusColors: any = {
    todo: "bg-gray-200 dark:bg-gray-700",
    inprogress: "bg-yellow-200 dark:bg-yellow-700",
    done: "bg-green-200 dark:bg-green-700",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((col) => (
        <div
          key={col}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 min-h-[350px]"
        >
          {/* Column Header */}
          <h3 className="text-lg font-semibold capitalize mb-4">
            {col}
          </h3>

          {/* Tasks */}
          <div className="space-y-3">
            {tasks
              .filter((t) => t.status === col)
              .map((t) => (
                <div
                  key={t._id || t.id}
                  className="p-4 bg-white dark:bg-gray-900
                             border border-gray-200 dark:border-gray-700
                             rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <p className="font-medium mb-3">{t.title}</p>

                  {/* Status Actions */}
                  <div className="flex flex-wrap gap-2">
                    {columns
                      .filter((c) => c !== col)
                      .map((target) => (
                        <button
                          key={target}
                          onClick={() => move(t._id || t.id, target)}
                          className={`text-xs px-2 py-1 rounded 
                                      ${statusColors[target]} 
                                      hover:opacity-80 transition`}
                        >
                          {target}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}