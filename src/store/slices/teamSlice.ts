import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTeamsAPI, createTeamAPI } from "../../features/team/api";

export const fetchTeams = createAsyncThunk("team/getAll", async () => {
  const res = await getTeamsAPI();
  return res.data;
});

export const createTeam = createAsyncThunk(
  "team/create",
  async (data: any) => {
    const res = await createTeamAPI(data);
    return res.data;
  }
);

const slice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    selectedTeam: null,
  } as any,
  reducers: {
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
      localStorage.setItem("teamId", action.payload); // persist
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.teams = action.payload;

      // auto select
      if (!state.selectedTeam && action.payload.length > 0) {
        state.selectedTeam =
          localStorage.getItem("teamId") || action.payload[0]._id;
      }
    });

    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.teams.push(action.payload);
      state.selectedTeam = action.payload._id;
    });
  },
});

export const { setSelectedTeam } = slice.actions;
export default slice.reducer;