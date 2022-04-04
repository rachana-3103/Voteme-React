export const AuthData = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        let id = userData["data"]["Data"]["user"]["_id"];
        let category = userData["data"]["Data"]["user"]["Category"];
        const token = userData["data"]["Data"]["AuthoToken"];
        const header = {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
        };
        const apiUrl = `http://localhost:8080/voteme/${id}/profile`;
        return {
            header,
            apiUrl,
            id,
            category
        }
    } else {
        return null;
    }

}