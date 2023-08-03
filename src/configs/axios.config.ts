import axios from "axios";

export const axiosDefault = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    timeout: 30000,
    // TODO: Temporário - Injetar Token na request
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.JSro9sgSzdXoiUheeIzfU5OBkBXmeTK61QFG5cJar8w'}
});
export const axiosAuthentication = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_ENDPOINT,
    timeout: 30000,
});
