import { ProductoInfo } from "@interfaces/product";

export const fetchProductMaterial = async (id: string): Promise<ProductoInfo | null> => {
  try {
    const response = await fetch(`https://deploybackenddiancrochet.onrender.com/admin/get/producto/${id}`);
    const data = await response.json();

    if (data?.productoInfo) {
      return data; // Devuelve el JSON completo
    } else {
      console.error("No se encontró información del productoInfo en la respuesta.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los datos del productoInfo:", error);
    return null;
  }
};


// updateProduct.ts
import { MaterialWithTallaUpdate, MaterialWithoutTallaUpdate } from "@interfaces/materials";

const API_BASE_URL = "https://deploybackenddiancrochet.onrender.com/admin/update/material";

export const updateMaterialWithSize = async (
  id: string,
  productData: MaterialWithTallaUpdate
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contalla/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      console.error("Error actualizando producto con talla:", response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const updateMaterialWithoutSize = async (
  id: string,
  productData: MaterialWithoutTallaUpdate
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sintalla/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      console.error("Error actualizando producto sin talla:", response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
