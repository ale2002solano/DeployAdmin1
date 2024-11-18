export interface Category {
    ID_CATEGORIA: number;
    CATEGORIA: string;
}
export interface ProductWithSize {
    productName: string;
    description: string;
    categories: number[];
    mainImage: string;
    galleryImages: string[] | null;
    sizeQuantities: Record<string, number | null>;
    sizePrices: Record<string, number | null>;
    keywords: string[];
  }
  
  export interface ProductWithoutSize {
    productName: string;
    price: number;
    stock: number;
    description: string;
    categories: string[];
    mainImage: string;
    galleryImages: string[];
    keywords: string[];
  }
export interface InfoProductos{
    id_producto: number;
    nombre_prod: string;
    precio_venta: number;
    color: string;
    cantidad_vendida: number;
    cantidad_disp: number;
    url_imagen: string;
    id_estado_fact: number;
}
