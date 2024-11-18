import { loginData } from "@interfaces/user"

const API_URL = "https://deploybackenddiancrochet.onrender.com/admin";


// Función para hacer el POST del login
export const login = async (data: loginData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error en el inicio de sesión");
    }

    return response.json();
};
