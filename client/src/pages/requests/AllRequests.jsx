import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ListLoader from "../../components/ListLoader";
import { getAllRequests } from "../../utils/http";

export default function AllRequests() {
  const [requests, setRequests] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRequests();
      setRequests(data);
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'reason', headerName: 'Reason', width: 130 },
    { field: 'start', headerName: 'Start Date', width: 130 },
    { field: 'end', headerName: 'End Date', width: 130 },
    { field: 'comment', headerName: 'Comment', width: 200 },
    { field: 'status', headerName: 'Status', width: 130 }
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh' }}>
    {requests ? <DataGrid
      rows={requests}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
