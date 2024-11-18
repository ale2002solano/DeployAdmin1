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

  export interface Product {
    id_producto: number;
    nombre_prod: string;
    precio_venta: number;
    descripcion: string;
    cantidad_disp: number | null;
    tipo_prod: string;
    color: string | null;
    tallas: string | null;
    grosores: Record<string, { cantidad: number; precio: number }>;
    imagen_principal: string;
    imagenes_extra: string[];
    nombre_marca: string;
  }

  export interface Grosor {
    cantidad: number | null;
    precio: number | null;
  }
  
  export interface ProductoInfo {
    productoInfo: {
      id_producto: string;
      nombre_prod: string;
      precio_venta: number;
      descripcion: string;
      cantidad_disp: number;
      tipo_prod: string;
      color: string;
      tallas: Record<string, { cantidad: number; precio: number }>;
      grosores: Record<string, { cantidad: number; precio: number }>;
      imagen_principal: string;
      imagenes_extra: string[];
      nombre_marca: string;
      categorias:string[];
    };
  }