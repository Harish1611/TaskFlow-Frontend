import { useEffect, useState } from "react";
import { getProjectsAPI, createProjectAPI } from "../api";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await getProjectsAPI();
    setProjects(res.data);
  };

  const create = async () => {
    await createProjectAPI({ name });
    setName("");
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={create}>Add</button>

      {projects.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}