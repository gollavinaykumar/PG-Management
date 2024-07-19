export const getIssues = async () => {
  try {
    const gettedIssues = await fetch("http://localhost:8080/dashboard/Issues", {
      method: "GET",
    });
    return gettedIssues.json();
  } catch (e) {
    console.log(e);
  }
};
