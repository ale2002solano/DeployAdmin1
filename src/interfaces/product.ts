export interface Category {
    ID_CATEGORIA: number;
    CATEGORIA: string;
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
