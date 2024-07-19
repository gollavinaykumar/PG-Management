import { Box } from "@mui/material";
import { AdminHeader, UserHeader } from "./homepage";
import { usersStore } from "../zustand/usersStore";
import { useUserStore } from "../zustand/useUserStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { roomsStore } from "../zustand/roomstore";
import { Image } from "antd";

export default function SeperateRoom() {
  const navigate = useNavigate();
  const loggedUser = useUserStore((s: any) => s.user);
 const { roomid } = useParams<{ roomid: string }>();
  React.useEffect(() => {
    if (!loggedUser || loggedUser.length === 0) {
      navigate("/signin");
    }
  }, [loggedUser, navigate]);

  if (!loggedUser || loggedUser.length === 0) {
    return null;
  }

  const isGmailUser = loggedUser[0]?.email.split("@")[1] === "gmail.com";
  const roomsAll = roomsStore((s: any) => s.rooms);
  const allUsers = usersStore((s: any) => s.user);
 

  const filtered = allUsers.filter((e: any) => e.roomId === roomid);
  const findRoomNo = roomsAll.filter((e: any) => e.id === roomid);

  return (
    <Box>
      {!isGmailUser ? <AdminHeader /> : <UserHeader />}
      {filtered.length > 0 ? (
        <>
          <h2 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
            Room No : {findRoomNo[0]?.roomno}
          </h2>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {filtered.map((e: any, index: number) => (
              <Link
                key={index}
                to={`/profile/?user=${e.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Image
                        src={
                          e.image != null
                            ? e.image
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAACUCAMAAADS8YkpAAAAM1BMVEXk5ueutLfr7O3n6eqqsLTh4+S3vL/d4OHU19nKztCnrrHb3d/GysyyuLvY29zR1da/xMYIdtfNAAAEIklEQVR4nO2c2a7jIAxAQ8wSSEj4/68d6KJppxtgYhNNzkul+3RkOWaz7zCcnJycnJycnJycnJyc/MdAglsigySpzLpZaxc7GXX9S6/AMG+LFs7JC84JvWxzr8ajssFLKZ6QwodtGLndXgEI4iNLbzEGY5387CulVR0ZA1j/xTbh9NSNMAxB/NC9JAW35w1Y/W/ZlBS+i5yA7d+a8JmJWzbq2lzZxMYe4SJdITfeUgzWFfkKx1omYCrUjax8wjDnVYZHpFZsvoMu1k3CXAGGJbuQPeIsjzCsVboRwyIM5cl7I7Do2trw8iwbpuZju6HpdQdEeIVcyXUVIrwR6mW5ZmV7wM3EGTxqRDpEAnGAARVeITztqowpZldoSxrgvrZYIQKpr6pe2+5oQ6gLE9pXzJS+Zaegd0jKs2flTvLJ1xL6qi93Zbm+lB8cZq9zh/KYYfCfmxCEvnMDXUGnC2sDXUm3Itef3B5whDuIg/keL754Xcr8HSruoV6h0z1c/T3a+na0/cPR9mdN9r+U8c18wvqCpzxfNDi/BdIDPf58vNCe5zfsB0f8TnSw+51hxCWEJL8/Q95P0j9qoQKsyZ9lYUPoMtyvYy7YJccDEaaksTx615cI2rvUO2BqA8zUF1Pc/HDF8TWZ1GzbiXcOj0DFOY61/wHm8owg3fe+CE+F35yjfLZ4R+EyN3G3qpYtGx00URZcpknW3L0DKvMtmaPr4R2gso73lBcOP4DJ/yhsTlN3EHwFwH5tAfZbdx3hYPV7ZSm07c02AWpaXucDpF+moUPbBAxqtlqm+YtkGn+1nVWvtjfGEcy0RVYDI/dq9ps0ODRe6XuIKFrCYNY0O7RcsTYGeU5R7i3MMYyrDdo/1ISHX6+XyfQR6WihzLZo576uF+nb88s2K8WqPQ7GhiC+TeI8Sjuhg125hjBgNEvMgLL9uhTeh4k+yJD2OLXHeSnDOhBWZYgFNmQmwQdcXEioopzyoDq2f4Psw0phDCZrGCsLv/fxKGbCgkuEZ5ye9iwX0bZZbG9IvVu1yJgirCKoXZZrWHexFZcbteYhTgOl+9iKlMath6BgQvZ//6LtpeWIf4//gdTtCgWosG9wr7QqxrDunAt32uTEOJHIikZ1Aj8JUCCMf5ej1L0I4yI8kupeuqYwwvi2jHLhQ+mihJu0JZcLL7XbH+DQre9MQ/dAVVN1tU1byZ6oegJt0uNbh6yYqObLBlHTew3bftvzDHxxgDltRfH44bgw+5Z9cjWNDW0p++QYa9ndt+jxFt/ei8aVzB/imiPbUNCyOPKHt6glVHUQ3vjF5QaYY9v7huyBEmQvcit8bhNrB9XhQmYJbjBc0YTcRsAGwyttyBzRaDAc1IbcfwmAH75qRF77V4vhtiZkdrn345u5hbj3W7DTRQvC/8UfBdc41lCfqbMAAAAASUVORK5CYII="
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={e.name} secondary={e.mobile} />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      ) : (
        <h3 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
          Room Empty
        </h3>
      )}
    </Box>
  );
}
