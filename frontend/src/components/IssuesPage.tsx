import { Box } from "@mui/material";
import { UserHeader } from "./homepage";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { createIssue, getIssues } from "../Services/createIssueService";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useUserStore } from "../zustand/useUserStore";

export default function IssuesPage() {
  const loggedUser = useUserStore((s: any) => s.user);
  const navigate = useNavigate();
  const [messages, setMessage] = useState("");
  const [issues, setIssues] = useState<DataType[]>([]);
  const params = useParams();

  interface DataType {
    i: number;
    message: string;
    status: string;
    createdAt: string;
  }

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

  async function fetchIssues() {
    const user = {
      roomId: params.roomid,
    };
    try {
      const gettedIssuesAll = await getIssues(user);
      const transformedIssues = gettedIssuesAll.map(
        (ele: any, index: number) => ({
          i: index + 1,
          message: ele.message,
          status: ele.status,
          createdAt: ele.createdAt,
        })
      );
      setIssues(transformedIssues);
    } catch (e) {
      console.log(e);
    }
  }

  async function createIssues() {
    const issue = {
      roomId: params.roomid,
      Issue: messages,
    };
    try {
      await createIssue(issue);
      message.success("Issue created successfully");
      setMessage("");
      fetchIssues();
    } catch (e) {
      message.error("Issue not created");
    }
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "S.no",
      dataIndex: "i",
      key: "i",
      render: (text) => <a>{text}</a>,
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
      render: (text) => (
        <h3 style={{ color: text === "solved" ? "green" : "red" }}>{text}</h3>
      ),
    },
    {
      title: "Issue Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <h5>{text}</h5>,
    },
  ];

  return (
    <Box>
      <UserHeader />
      <Form style={{ margin: 20 }}>
        <h3 style={{ textAlign: "center" }}>Room ID: {params.roomid}</h3>
        <Form.Item name={["user", "Issue"]} label="Issue">
          <Input.TextArea
            value={messages}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Item>
        <Button
          onClick={() => {
            if (messages !== "") {
              createIssues();
            } else {
              message.error("Message shouldn't be empty");
            }
          }}
        >
          Submit
        </Button>
        <Divider />
      </Form>
      <Box style={{ margin: 20 }}>
        <h3 style={{ textAlign: "center" }}>Issues Table</h3>
        <Table columns={columns} dataSource={issues} />
      </Box>
    </Box>
  );
}
