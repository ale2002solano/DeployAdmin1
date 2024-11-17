import { ProductoInfo } from "@interfaces/product";

export const fetchProductData = async (id: string): Promise<ProductoInfo | null> => {
    try {
      const response = await fetch(`https://deploybackenddiancrochet.onrender.com/admin/get/producto/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los datos del producto");
      }
      const data = await response.json();
      return data.productoInfo as ProductoInfo;
    } catch (error) {
      console.error("Error al obtener los datos del producto:", error);
      return null;
    }
  };