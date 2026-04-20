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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <button
          onClick={() => navigate("/projects")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          + New Project
        </button>
      </div>

      {/* Projects Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Projects</h3>

        {projects.length === 0 ? (
          <div className="text-center py-10 border rounded-lg dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No projects found
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project._id || project.id}
                onClick={() =>
                  navigate(`/projects/${project._id || project.id}`)
                }
                className="cursor-pointer p-4 rounded-xl border 
                           bg-white hover:shadow-md transition
                           dark:bg-gray-800 dark:border-gray-700"
              >
                <h4 className="text-lg font-semibold mb-1">
                  {project.name}
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click to open board →
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}