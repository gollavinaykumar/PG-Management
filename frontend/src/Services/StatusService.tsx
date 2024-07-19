export const getIssues = async (user: {}) => {
  try {
    const users = await fetch(
      "http://localhost:8080/dashboard/Issues/:issueid",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    return users.json();
  } catch (err) {
    console.log(err);
  }
};

export const statusChange = async (user: {}) => {
  try {
    const users = await fetch(
      "http://localhost:8080/dashboard/Issues/:issueid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    return users.json();
  } catch (err) {
    console.log(err);
  }
};
