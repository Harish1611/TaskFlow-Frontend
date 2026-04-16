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

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {columns.map(col => (
        <div key={col}>
          <h3>{col}</h3>
          {tasks
            .filter(t => t.status === col)
            .map(t => (
              <div key={t.id}>
                {t.title}
                <button onClick={() => move(t.id, "done")}>✔</button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}