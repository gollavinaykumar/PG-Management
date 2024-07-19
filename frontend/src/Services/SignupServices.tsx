export const createUser = async (user: {}) => {
  try {
    const users = await fetch("http://localhost:8080/signup", {
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
