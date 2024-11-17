import { Category, InfoProductos } from "@interfaces/product";

const API_URL = "https://deploybackenddiancrochet.onrender.com/admin";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('https://deploybackenddiancrochet.onrender.com/admin/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const data = await response.json();
    return data.imageUrl; // Devuelve la URL de la imagen cargada
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};

export const updateProfilePic = async (correo: string, imageUrl: string) => {
  try {
    const response = await fetch(`https://deploybackenddiancrochet.onrender.com/user/actualizar/foto/${correo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nueva_url_imagen: imageUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile picture');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating profile picture:', error);
    throw new Error('Error updating profile picture');
  }
};

// Función para obtener las categorías
export const fetchCategories = async (): Promise<Category[]> => {
  try {
      const response = await fetch('https://deploybackenddiancrochet.onrender.com/producto/categorias');
      if (!response.ok) {
          throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      return data.categorias as Category[];
  } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
  }
};

export const getProducts = async(): Promise<InfoProductos[]> =>{
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) {
    throw new Error("Error al traer productos");
  }
  const data = await res.json();
  return data.productos;
}

export const getProductosPorTipo = async (id: number): Promise<InfoProductos[]> => {
  try {
    const response = await fetch(`${API_URL}/prodcutos/categoria/${id}`);
    const data = await response.json();
    return data.productosConCategoria; 
  } catch (error) {
    console.error('Error al obtener productos por tipo:', error);
    return []; 
  }
};

