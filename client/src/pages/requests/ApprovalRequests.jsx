import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ListLoader from "../../components/ListLoader";
import { getApprovalRequests } from "../../utils/http";

export default function ApprovalRequests() {
  const [requests, setRequests] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getApprovalRequests();
      setRequests(data);
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'request_id', headerName: 'ReqID', width: 70 },
    { field: 'employee_name', headerName: 'Employee name', width: 200 },
    { field: 'reason', headerName: 'Reason', width: 130 },
    { field: 'start_date', headerName: 'Start Date', width: 130 },
    { field: 'end_date', headerName: 'End Date', width: 130 },
    { field: 'comment', headerName: 'Comment', width: 200 },
    { field: 'approver_name', headerName: 'Approver name', width: 200 },
    { field: 'hr_comment', headerName: 'Approval comment', width: 200 },
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
