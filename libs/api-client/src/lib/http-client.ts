import axios from "axios";


const API_BASE_URL = process.env['API_BASE_URL'] ?? 'http://localhost:3000';

export const http = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
})

export async function get<T>(url: string): Promise<T>{
    const response = await http.get<T>(url);
    return response.data;
}