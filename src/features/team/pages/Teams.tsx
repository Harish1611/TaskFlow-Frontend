import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeams,
  createTeam,
  setSelectedTeam,
} from "../../../store/slices/teamSlice";

export default function Teams() {
  const dispatch: any = useDispatch();
  const { teams, selectedTeam } = useSelector((s: any) => s.team);

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchTeams());
  }, []);

  const handleCreate = async () => {
    if (!name) return;
    await dispatch(createTeam({ name }));
    setName("");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6">Teams</h2>

      {/* Create Team */}
      <div className="flex gap-3 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter team name..."
          className="flex-1 px-4 py-2 border rounded-lg outline-none
                     focus:ring-2 focus:ring-blue-500
                     dark:bg-gray-800 dark:border-gray-700"
        />

        <button
          onClick={handleCreate}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 transition"
        >
          Create
        </button>
      </div>

      {/* Team List */}
      {teams.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">
          No teams available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((t: any) => (
            <div
              key={t._id}
              onClick={() => dispatch(setSelectedTeam(t._id))}
              className={`p-5 rounded-xl border cursor-pointer transition
                ${
                  selectedTeam === t._id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-md"
                }`}
            >
              <h3 className="text-lg font-semibold">{t.name}</h3>

              {selectedTeam === t._id && (
                <p className="text-sm mt-2 opacity-80">
                  Selected Team
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}