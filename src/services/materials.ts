import { categoriasMateriales } from "@interfaces/materials";

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