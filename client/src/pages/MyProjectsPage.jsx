import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ListLoader from "../components/ListLoader";
import { getMyProjects } from "../utils/http";

export default function MyProjectsPage() {
  const userId = localStorage.getItem('user_id');
  const [myProjects, setMyProjects] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyProjects(userId);
      setMyProjects(data);
    };
    fetchData();
  }, [userId]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'start', headerName: 'Start Date', width: 130 },
    { field: 'end', headerName: 'End Date', width: 130 },
    { field: 'manager', headerName: 'Manager', width: 130 },
    { field: 'comment', headerName: 'Comment', width: 200 },
    { field: 'status', headerName: 'Status', width: 130 }
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh' }}>
    {myProjects ? <DataGrid
      rows={myProjects}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
