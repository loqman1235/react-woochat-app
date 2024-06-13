import api from "./api";

const handleUnkickUser = async (userId: string, roomId: string) => {
  if (!roomId || !userId) return;

  console.log(roomId, userId);

  try {
    const response = await api.post(`/rooms/${roomId}/unkick/${userId}`);

    if (response.status === 200) {
      console.log("User un-kicked successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleKickUser = async (userId: string, roomId: string) => {
  if (!roomId || !userId) return;

  console.log(roomId, userId);

  try {
    const response = await api.post(`/rooms/${roomId}/kick/${userId}`);

    if (response.status === 200) {
      console.log("User kicked successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export { handleUnkickUser, handleKickUser };
