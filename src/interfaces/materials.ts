export interface categoriasMateriales {
    ID_CATEGORIA: number;
    CATEGORIA: string;
}
export interface MaterialWithoutTalla {
    productName: string;
    description: string;
    price: number | null; // Puede ser null si no se proporciona
    stock: number | null; // Puede ser null si no se proporciona
    mainImage: string | null;
    galleryImages: string[] | null;
    keywords: string[];
    categoryId: number | null; // Puede ser null si no se selecciona una categoría
    marca: string;
  }

  export interface MaterialWithTalla {
    productName: string;
    description: string;
    sizePrices: Record<string, number | null>; // Precios por grosor (LACE, SUPERFINE, etc.)
    sizeQuantities: Record<string, number | null>; // Cantidades por grosor
    mainImage: string | null;
    galleryImages: string[] | null;
    keywords: string[];
    categoryId: number; // ID de la categoría siempre debe estar definido
    marca: string;
  }

  