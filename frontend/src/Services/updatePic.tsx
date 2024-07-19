export const updatePic = async (user: {}) => {
  try {
    const updatedPic = await fetch("http://localhost:8080/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return updatedPic.json();
  } catch (e) {
    console.log(e);
  }
};

export const updateUserDetails = async (user: {}) => {
  try {
    const updatedUserDetails = await fetch("http://localhost:8080/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return updatedUserDetails.json();
  } catch (e) {
    console.log(e);
  }
};

