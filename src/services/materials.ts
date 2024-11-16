import { categoriasMateriales } from "@interfaces/materials";
import { MaterialWithTalla, MaterialWithoutTalla } from "@interfaces/materials";
import axios from "axios";

const BASE_URL = "https://deploybackenddiancrochet.onrender.com/admin/create/material";

export const fetchCategoriesMaterials = async (): Promise<categoriasMateriales[]> => {
    try {
        const response = await fetch('https://deploybackenddiancrochet.onrender.com/producto/categorias/materiales');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data.categoriasMateriales as categoriasMateriales[];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const createMaterialWithTalla = async (materialData: MaterialWithTalla) => {
    try {
      const response = await axios.post(`${BASE_URL}/contalla`, materialData);
      return response.data;
    } catch (error) {
      console.error("Error al crear material con talla:", error);
      throw error;
    }
  };

  export const createMaterialWithoutTalla = async (materialData: MaterialWithoutTalla) => {
    try {
      const response = await axios.post(`${BASE_URL}/sintalla`, materialData);
      return response.data;
    } catch (error) {
      console.error("Error al crear material sin talla:", error);
      throw error;
    }
  }; 
