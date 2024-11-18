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