import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminHeader } from "./homepage";
import { roomsStore } from "../zustand/roomstore";
import { usersStore } from "../zustand/usersStore";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useUserStore } from "../zustand/useUserStore";
import { useNavigate } from "react-router-dom";

interface DataType {
  Sno: number;
  roomno: number;
  roomid: String;
  total: number;
  remaining: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "S.no",
    dataIndex: "Sno",
    key: "S.no",
    render: (text) => <h3>{text}</h3>,
  },
  {
    title: "Room No",
    dataIndex: "roomno",
    key: "roomno",
    render: (text) => <h3>{text}</h3>,
  },
  {
    title: "Room ID",
    dataIndex: "roomid",
    key: "roomid",
    render: (text) => <h3>{text}</h3>,
  },
  {
    title: "Total Beds",
    dataIndex: "total",
    key: "total",
    render: (text) => <h3>{text}</h3>,
  },
  {
    title: "Remaining Beds",
    dataIndex: "remaining",
    key: "remaining",
    render: (text) => (
      <>
        {text > 0 ? (
          <h2 style={{ color: "green" }}>{text}</h2>
        ) : (
          <h2 style={{ color: "red" }}>{text}</h2>
        )}
      </>
    ),
  },
];

export default function RoomsList() {
  const ALLROOMS = roomsStore((s: any) => s.rooms);
  const ALLUSERS = usersStore((s: any) => s.user);
  const loggedUser = useUserStore((s: any) => s.user);
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState<DataType[]>([]);

  useEffect(() => {
    if (!loggedUser || !loggedUser[0] || !loggedUser[0].id) {
      navigate("/signin");
    } else {
      fetchdata();
    }
  }, [navigate, loggedUser]);
  if (!loggedUser || loggedUser.length === 0 || !loggedUser[0]?.id) {
    return null;
  }

  async function fetchdata() {
    const filterTable = ALLROOMS.map((e: any, index: number) => ({
      Sno: index + 1,
      roomno: e.roomno,
      roomid: e.id,
      total: e.capacity,
      remaining: findCount(e.id, e.capacity),
    }));
    setFiltered(filterTable);
  }

  function findCount(id: any, capacity: any) {
    const count = ALLUSERS.filter((e: any) => e.roomId == id);
    return capacity - count.length;
  }

  return (
    <Box>
      <AdminHeader />
      <Box sx={{ margin: 2, width: "100%" }}>
        <Table
          columns={columns}
          dataSource={filtered}
          style={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
}
