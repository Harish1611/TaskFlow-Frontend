import { useEffect, useState } from "react";
import { getProjectsAPI, createProjectAPI } from "../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const selectedTeam = useSelector((s: any) => s.team.selectedTeam);

  const load = async () => {
    const res = await getProjectsAPI();
    setProjects(res.data);
  };

  const create = async () => {
    if (!selectedTeam) {
      alert("Select a team");
      return;
    }

    await createProjectAPI({
      name,
      teamId: selectedTeam,
    });

    setName("");
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>

      {/* Create Project */}
      <div className="flex gap-3 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none
                     focus:ring-2 focus:ring-blue-500
                     dark:bg-gray-800 dark:border-gray-700"
        />

        <button
          onClick={create}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 transition"
        >
          Create
        </button>
      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">
          No projects found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/projects/${p._id}`)}
              className="p-5 bg-white dark:bg-gray-900
                         border border-gray-200 dark:border-gray-700
                         rounded-xl shadow-sm hover:shadow-md
                         cursor-pointer transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {p.name}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click to view tasks →
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}