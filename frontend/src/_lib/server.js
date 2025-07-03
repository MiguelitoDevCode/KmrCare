import axios from "axios";

const serverAuth = (Headers) => axios.create({
    baseURL: "http://localhost:8080/auth/",
    headers: {
        "Accept": "application/json",
        ...Headers,
    },
});

const serverApi = (Headers) => axios.create({
    baseURL: "http://localhost:8080/auth/",
    headers: {
        "Accept": "application/json",
        ...Headers,
    },
});

const serverAppointment = (Headers) => axios.create({
    baseURL: "http://localhost:8080/auth/",
    headers: {
        "Accept": "application/json",
        ...Headers,
    },
});

export default serverAuth;
export { serverApi, serverAppointment };