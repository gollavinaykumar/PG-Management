import { Box } from "@mui/material";
import { AdminHeader } from "./homepage";
import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";
import { useEffect } from "react";

const gridStyle: React.CSSProperties = {
  width: "50%",
  height: "250px",
  textAlign: "center",
  placeContent: "center",
};

export default function DashBoard() {
  const loggedUser = useUserStore((s: any) => s.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser || !loggedUser[0] || !loggedUser[0].id) {
      navigate("/signin");
    }
  }, [loggedUser, navigate]);
  if (!loggedUser || loggedUser.length === 0 || !loggedUser[0]?.id) {
    return null;
  }
  return (
    <Box>
      <AdminHeader />
      <Box>
        <Card>
          <Card.Grid style={gridStyle}>
            <Link to={"/dashboard/Issues"}>
              <h3>ISSUES</h3>
            </Link>
          </Card.Grid>

          <Card.Grid style={gridStyle}>
            <Link to={"/dashboard/ListRooms"}>
              <h3>ROOMS</h3>
            </Link>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <h3>PAYMENTS</h3>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <h3>GRAPH</h3>
          </Card.Grid>
        </Card>
      </Box>
    </Box>
  );
}
