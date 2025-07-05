import axios from "axios";

const serverAuth = (Headers) => axios.create({
    baseURL: "https://will1285.pythonanywhere.com/auth/",
    headers: {
        "Accept": "application/json",
        ...Headers,
    },
});

const serverApi = (Headers) => axios.create({
    baseURL: "https://will1285.pythonanywhere.com/auth/",
    headers: {
        "Accept": "application/json",
        ...Headers,
    },
});

const serverAppointment = (Headers) => axios.create({
    baseURL: "https://will1285.pythonanywhere.com/auth/",
    headers: {
        "Accept": "application/json",
        ...Headers,
    },
});

export default serverAuth;
export { serverApi, serverAppointment };