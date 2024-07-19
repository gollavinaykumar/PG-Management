import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminHeader } from "./homepage";
import { useParams } from "react-router-dom";
import { getIssues, statusChange } from "../Services/StatusService";
import { Button, Radio, message } from "antd";
import { useUserStore } from "../zustand/useUserStore";
import { useNavigate } from "react-router-dom";
export default function SingleIssue() {
  const loggedUser = useUserStore((s: any) => s.user);
  const navigate = useNavigate();
  const params = useParams();
  const [issueDetails, setIssueDetails] = useState<any[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!loggedUser || !loggedUser[0] || !loggedUser[0].id) {
      navigate("/signin");
    } else {
      fetchDetails();
    }
  }, [loggedUser, navigate]);
  if (!loggedUser || loggedUser.length === 0 || !loggedUser[0]?.id) {
    return null;
  }

  async function fetchDetails() {
    const obj = {
      issueId: params.issueid,
    };
    try {
      const issueDetails = await getIssues(obj);
      setIssueDetails(issueDetails);
      setStatus(issueDetails[0].status);
    } catch (e) {
      console.log(e);
    }
  }

  const handleStatusChange = async () => {
    try {
      const obj = {
        issueId: params.issueid,
        status: status,
      };
      const statusChanging = await statusChange(obj);
      message.success("Status changed successfully");
      console.log(statusChanging);
    } catch (e: any) {
      message.error(e.message || "Failed to change status");
    }
  };

  console.log(status);
  return (
    <Box>
      <AdminHeader />
      <Box sx={{ margin: 20 }}>
        {issueDetails.map((e: any) => {
          return (
            <Box key={e.id}>
              <h3>Issue Id : {e.id}</h3>
              <h4>Room Id : {e.roomId}</h4>
              <h4>Issue : {e.message}</h4>
              <Radio.Group
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <Radio value="solved">Solved</Radio>
                <Radio value="not solved">not solved</Radio>
              </Radio.Group>
              <br />
              <Button onClick={handleStatusChange}>Update</Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
