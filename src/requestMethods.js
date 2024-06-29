import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmM5NGIxM2Q4NThjYmU4OWQ1OTRkYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTY2MTcxMywiZXhwIjoxNzE5OTIwOTEzfQ.mFkeHx_2h-ndwQgOqgV8AVBMy6oHW3TlA2BHC3-Mte8";

export const publicRequest = axios.create({
    baseURL:BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})