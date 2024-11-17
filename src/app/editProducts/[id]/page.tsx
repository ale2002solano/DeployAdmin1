'use client';
import { useEffect, useState } from "react";
import { ProductoInfo } from "@interfaces/product";
import EditForm from "../components/EditForm";
import { fetchProductData } from "../components/helpers/fetchProduct";  // Importa el helper

const EditMaterialPage: React.FC = () => {
  const id = "283"; // Puedes ajustar esto como parámetro dinámico más adelante
  const [productData, setProductData] = useState<ProductoInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductData(id);
      setProductData(data);
    };

    fetchData().catch((error) => {
      console.error("Error al obtener los datos del producto:", error);
    });
  }, [id]);

  if (!productData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Editar Producto</h1>
      <EditForm initialData={productData} />
    </div>
  );
};

export default EditMaterialPage;