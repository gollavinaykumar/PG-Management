import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { AdminHeader } from "./homepage";
import { Button, Table, message } from "antd";
import type { TableProps } from "antd";
import { getIssues } from "../Services/AdminIssues";
import { roomsStore } from "../zustand/roomstore";
import { useUserStore } from "../zustand/useUserStore";
import { Link, useNavigate } from "react-router-dom";

interface DataType {
  i: number;
  message: string;
  status: string;
  createdAt: string;
  room: number;
}

const AllIssues: React.FC = () => {
  const loggedUser = useUserStore((s: any) => s.user);
  const navigate = useNavigate();
  const [issues, setIssues] = useState<DataType[]>([]);
  const allRooms = roomsStore((s: any) => s.rooms);

  useEffect(() => {
    if (!loggedUser || !loggedUser[0] || !loggedUser[0].id) {
      navigate("/signin");
    } else {
      fetchIssues();
    }
  }, [loggedUser, navigate]);
  if (!loggedUser || loggedUser.length === 0 || !loggedUser[0]?.id) {
    return null;
  }

  function checked(e: any) {
    if (e.status == "solved") {
      e.status = "unsolved";
    }
    console.log(e);
  }

  async function fetchIssues() {
    try {
      const gettedIssuesAll = await getIssues();
      const filledDetails = gettedIssuesAll.map((ele: any, index: number) => ({
        i: index + 1,
        id: ele.id,
        message: ele.message,
        room: findRoomNumber(ele.roomId),
        status: ele.status,
        createdAt: ele.createdAt,
      }));
      setIssues(filledDetails);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
      message.error("Failed to fetch issues");
    }
  }

  const findRoomNumber = (roomId: number) => {
    const room = allRooms.find((r: any) => r.id === roomId);
    return room ? room.roomno : "Unknown";
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "S.no",
      dataIndex: "i",
      key: "i",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "RoomNo",
      dataIndex: "room",
      key: "room",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Issue",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <h3 style={{ color: text === "solved" ? "green" : "red" }}>
          {record.status}
        </h3>
      ),
    },
    {
      title: "Issue Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Update",
      dataIndex: "solve",
      key: "solve",
      render: (text, record:any) => (
        <Link to={`/dashboard/Issues/${record.id}`}>
          <Button onClick={() => checked(record)}>Click to Update</Button>
        </Link>
      ),
    },
  ];
  
  return (
    <Box>
      <AdminHeader />
      <Box style={{ margin: 20 }}>
        <Table columns={columns} dataSource={issues} />
      </Box>
    </Box>
  );
};

export default AllIssues;
