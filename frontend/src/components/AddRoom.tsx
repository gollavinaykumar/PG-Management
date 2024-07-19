import React, { useState } from "react";
import { Button, InputNumber, message } from "antd";
import { Box } from "@mui/material";

import { addRoom } from "../Services/addRoomService";
import { AdminHeader } from "./homepage";

const AddRoom: React.FC = () => {
  const [roomNo, setRoomNo] = useState<number | null>(null);
  const [capacity, setCapacity] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  async function onSubmit() {
    try {
      const createRoom = await addRoom({ roomno: roomNo, capacity, price });
      if (createRoom.id) {
        message.success("Room created successfully");
      }
      if (createRoom.message) {
        message.error("Room already added");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <AdminHeader />
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="center"
        mt={4}
      >
        <InputNumber
          placeholder="Room no"
          style={{ width: 200 }}
          value={roomNo}
          onChange={setRoomNo}
        />
        <InputNumber
          placeholder="Capacity"
          style={{ width: 200 }}
          value={capacity}
          onChange={setCapacity}
        />
        <InputNumber
          placeholder="Price"
          style={{ width: 200 }}
          value={price}
          onChange={setPrice}
        />
        <Button
          type="primary"
          onClick={onSubmit} // Change onSubmit to onClick
        >
          Create Room
        </Button>
      </Box>
    </Box>
  );
};

export default AddRoom;
