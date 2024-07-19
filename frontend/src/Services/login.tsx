export const checkUser = async (user: {}) => {
  try {
    const users = await fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return users.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async () => {
  try {
    const gettedUsers = await fetch("http://localhost:8080/signin", {
      method: "GET",
    });
    return gettedUsers.json();
  } catch (e) {
    console.log(e);
  }
};
