import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminHeader, UserHeader } from "./homepage";
import { useUserStore } from "../zustand/useUserStore";
import { Button, Form, Input, Upload, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { usersStore } from "../zustand/usersStore";
import { updatePic, updateUserDetails } from "../Services/updatePic";
import type { UploadFile, UploadProps } from "antd";

type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function Profile() {
  const [searchParams] = useSearchParams();
  const loggedUser = useUserStore((s: any) => s.user);
  const setLoggedUser = useUserStore((s: any) => s.setUser);
  const ALLUSERS = usersStore((s: any) => s.user);
  const sortedUser1 = ALLUSERS.find(
    (e: any) => e.id === searchParams.get("user")
  );
  const [email, setEmail] = useState(sortedUser1.email);
  const [name, setName] = useState(sortedUser1.name);
  const [mobile, setmobile] = useState(sortedUser1.mobile);
  const [roomId, setRoomId] = useState(sortedUser1.roomId);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser || loggedUser.length === 0) {
      navigate("/signin");
    }
  }, [loggedUser, navigate]);
  const isGmailUser = loggedUser[0]?.email.split("@")[1] === "gmail.com";

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  async function updatePIC() {
    if (fileList.length > 0) {
      const user = {
        userId: searchParams.get("user"),
        img: fileList[0].thumbUrl,
      };
      try {
        await updatePic(user);
        message.success("update sucess");
      } catch (err) {
        console.error("Failed to update image", err);
        message.error("error on updated pic");
      }
    }
  }

  async function updateUserDetailsIn() {
    const user = {
      email: email,
      name: name,
      mobile: mobile,
      roomId: roomId,
      userId: searchParams.get("user"),
    };
    try {
      const returnedDetails = await updateUserDetails(user);
      message.success("update sucess");
    } catch (err) {
      console.error("Failed to update details", err);
      message.error("error on room doesnt exist");
    }
  }
  if (!loggedUser || loggedUser.length === 0) {
    return null;
  }

  return (
    <Box>
      <Box>{!isGmailUser ? <AdminHeader /> : <UserHeader />}</Box>
      <Box sx={{ margin: 5, display: "flex", justifyContent: "space-between" }}>
        <Image
          width={200}
          src={
            sortedUser1.image != null
              ? sortedUser1.image
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAACUCAMAAADS8YkpAAAAM1BMVEXk5ueutLfr7O3n6eqqsLTh4+S3vL/d4OHU19nKztCnrrHb3d/GysyyuLvY29zR1da/xMYIdtfNAAAEIklEQVR4nO2c2a7jIAxAQ8wSSEj4/68d6KJppxtgYhNNzkul+3RkOWaz7zCcnJycnJycnJycnJyc/MdAglsigySpzLpZaxc7GXX9S6/AMG+LFs7JC84JvWxzr8ajssFLKZ6QwodtGLndXgEI4iNLbzEGY5387CulVR0ZA1j/xTbh9NSNMAxB/NC9JAW35w1Y/W/ZlBS+i5yA7d+a8JmJWzbq2lzZxMYe4SJdITfeUgzWFfkKx1omYCrUjax8wjDnVYZHpFZsvoMu1k3CXAGGJbuQPeIsjzCsVboRwyIM5cl7I7Do2trw8iwbpuZju6HpdQdEeIVcyXUVIrwR6mW5ZmV7wM3EGTxqRDpEAnGAARVeITztqowpZldoSxrgvrZYIQKpr6pe2+5oQ6gLE9pXzJS+Zaegd0jKs2flTvLJ1xL6qi93Zbm+lB8cZq9zh/KYYfCfmxCEvnMDXUGnC2sDXUm3Itef3B5whDuIg/keL754Xcr8HSruoV6h0z1c/T3a+na0/cPR9mdN9r+U8c18wvqCpzxfNDi/BdIDPf58vNCe5zfsB0f8TnSw+51hxCWEJL8/Q95P0j9qoQKsyZ9lYUPoMtyvYy7YJccDEaaksTx615cI2rvUO2BqA8zUF1Pc/HDF8TWZ1GzbiXcOj0DFOY61/wHm8owg3fe+CE+F35yjfLZ4R+EyN3G3qpYtGx00URZcpknW3L0DKvMtmaPr4R2gso73lBcOP4DJ/yhsTlN3EHwFwH5tAfZbdx3hYPV7ZSm07c02AWpaXucDpF+moUPbBAxqtlqm+YtkGn+1nVWvtjfGEcy0RVYDI/dq9ps0ODRe6XuIKFrCYNY0O7RcsTYGeU5R7i3MMYyrDdo/1ISHX6+XyfQR6WihzLZo576uF+nb88s2K8WqPQ7GhiC+TeI8Sjuhg125hjBgNEvMgLL9uhTeh4k+yJD2OLXHeSnDOhBWZYgFNmQmwQdcXEioopzyoDq2f4Psw0phDCZrGCsLv/fxKGbCgkuEZ5ye9iwX0bZZbG9IvVu1yJgirCKoXZZrWHexFZcbteYhTgOl+9iKlMath6BgQvZ//6LtpeWIf4//gdTtCgWosG9wr7QqxrDunAt32uTEOJHIikZ1Aj8JUCCMf5ej1L0I4yI8kupeuqYwwvi2jHLhQ+mihJu0JZcLL7XbH+DQre9MQ/dAVVN1tU1byZ6oegJt0uNbh6yYqObLBlHTew3bftvzDHxxgDltRfH44bgw+5Z9cjWNDW0p++QYa9ndt+jxFt/ei8aVzB/imiPbUNCyOPKHt6glVHUQ3vjF5QaYY9v7huyBEmQvcit8bhNrB9XhQmYJbjBc0YTcRsAGwyttyBzRaDAc1IbcfwmAH75qRF77V4vhtiZkdrn345u5hbj3W7DTRQvC/8UfBdc41lCfqbMAAAAASUVORK5CYII="
          }
          style={{ borderRadius: 100 }}
        />
        {loggedUser[0].email.split("@")[1] != "gmail.com" && (
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        )}

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
        {fileList.length > 0 && <Button onClick={updatePIC}>Update</Button>}
      </Box>
      <Box sx={{ padding: 2, margin: 5 }}>
        <Form>
          <Form.Item label="UserName">
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Mobile">
            <Input
              value={mobile}
              onChange={(e) => {
                setmobile(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="JoinedDate">
            <Input value={sortedUser1.createdAt} />
          </Form.Item>
          <Form.Item label="RoomId">
            <Input
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
            />
          </Form.Item>
          {loggedUser[0].email.split("@")[1] != "gmail.com" && (
            <Button onClick={updateUserDetailsIn}>update</Button>
          )}
        </Form>
      </Box>
    </Box>
  );
}
