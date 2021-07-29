export const AuthData = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let id = userData["data"]["Data"]["user"]["_id"];
    const token = userData["data"]["Data"]["AuthoToken"];
    const header = {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
    };
    const apiUrl = `http://localhost:3000/voteme/${id}/profile`;
    return {
        header,
        apiUrl
    }
}