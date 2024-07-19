export const getRooms = async () => {
  try {
    const gettedRooms = await fetch("http://localhost:8080", {
      method: "GET",
    });
    return gettedRooms.json();
  } catch (e) {
    console.log(e);
  }
};


