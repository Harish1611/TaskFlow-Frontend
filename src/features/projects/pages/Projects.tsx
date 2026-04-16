import { useEffect, useState } from "react";
import { getProjectsAPI, createProjectAPI } from "../api";
import { getTeamsAPI } from "../../team/api";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [name, setName] = useState("");

  const load = async () => {
    const res = await getProjectsAPI();
    setProjects(res.data);
  };

  const loadTeams = async () => {
    const res = await getTeamsAPI();
    setTeams(res.data);

    // auto-select first team
    if (res.data.length > 0) {
      setSelectedTeam(res.data[0]._id);
    }
  };

  const create = async () => {
    if (!selectedTeam) {
      alert("Select a team first");
      return;
    }

    await createProjectAPI({
      name,
      teamId: selectedTeam, // ✅ FIX
    });

    setName("");
    load();
  };

  useEffect(() => {
    load();
    loadTeams();
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      {/* 🧠 Team Selector */}
      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>

      {/* Project Input */}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={create}>Add</button>

      {projects.map((p) => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}