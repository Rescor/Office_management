import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import ListLoader from "../../components/ListLoader";
import { getLeaveRequests } from "../../utils/http";

export default function LeaveRequests() {
  const [requests, setRequests] = useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      let data = await getLeaveRequests();
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
    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 280,
      getActions: (params) => [
        <NavLink to={`${params.id}/open`}>
          <Button variant="contained" size="small">Open</Button>
        </NavLink>
      ],
    },
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh' }}>
    {requests ? <DataGrid
      rows={requests}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
