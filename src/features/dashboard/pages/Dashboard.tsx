import { useEffect, useState } from "react";
import { getProjectsAPI } from "../../projects/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      const res = await getProjectsAPI();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      <button onClick={() => navigate("/projects")}>
        Go to Projects
      </button>

      <h3 style={{ marginTop: 20 }}>Your Projects</h3>

      {projects.length === 0 && <p>No projects found</p>}

      {projects.map((project) => (
        <div
          key={project._id || project.id}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            marginBottom: 10,
            cursor: "pointer",
          }}
          onClick={() => navigate(`/projects/${project._id || project.id}`)}
        >
          <h4>{project.name}</h4>
        </div>
      ))}
    </div>
  );
}