export const createIssue = async (user: {}) => {
  try {
    const createdIssue = await fetch("http://localhost:8080/:roomid/Issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return createdIssue.json();
  } catch (err) {
    console.log(err);
  }
};

export const getIssues = async (user: {}) => {
  try {
    const gettedIssue = await fetch("http://localhost:8080/:roomid/Issues", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return gettedIssue.json();
  } catch (err) {
    console.log(err);
  }
};
