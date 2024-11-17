import React, { useState, useEffect, useRef } from "react";
import { ProductoInfo,Grosor } from "@interfaces/product"; 

interface MaterialFormProps {
  initialData: ProductoInfo;
}

const EditForm: React.FC<MaterialFormProps> = ({ initialData }) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  // Estado para los campos del formulario
  const [productName, setProductName] = useState(initialData.nombre_prod || "");
  const [description, setDescription] = useState(initialData.descripcion || "");
  const [price, setPrice] = useState(initialData.precio_venta.toString() || "");
  const [stock, setStock] = useState(initialData.cantidad_disp?.toString() || "");
  const [marca, setMarca] = useState(initialData.nombre_marca || "");
  const [mainImage, setMainImage] = useState(initialData.imagen_principal || "");
  const [galleryImages, setGalleryImages] = useState(initialData.imagenes_extra || []);
  const [grosores, setGrosores] = useState<Grosor[]>(Object.values(initialData.grosores || {}));
  
  // Función para manejar el cambio en los grosores
  const handleGrosorChange = (index: number, field: keyof Grosor, value: string) => {
    const updatedGrosores = [...grosores];
    updatedGrosores[index][field] = value ? parseFloat(value) : null;
    setGrosores(updatedGrosores);
  };

  const handleAddGrosor = () => {
    setGrosores([...grosores, { cantidad: null, precio: null }]);
  };

  const handleRemoveGrosor = (index: number) => {
    const updatedGrosores = grosores.filter((_, i) => i !== index);
    setGrosores(updatedGrosores);
  };

  // Función para manejar la presentación del formulario
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      nombre_prod: productName,
      descripcion: description,
      precio_venta: parseFloat(price),
      cantidad_disp: stock ? parseInt(stock) : null,
      nombre_marca: marca,
      imagen_principal: mainImage,
      imagenes_extra: galleryImages,
      grosores: grosores.reduce((acc, curr, idx) => {
        acc[`grosores_${idx + 1}`] = curr;
        return acc;
      }, {} as Record<string, Grosor>),
    };
    console.log("Datos actualizados:", updatedProduct);
  };

  return (
    <div className="bg-white text-black">
    <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label className="block">Nombre del Producto</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Cantidad Disponible</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Marca</label>
        <input
          type="text"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Imagen Principal</label>
        <input
          type="text"
          value={mainImage}
          onChange={(e) => setMainImage(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block">Galería de Imágenes</label>
        <input
          type="text"
          value={galleryImages.join(", ")}
          onChange={(e) => setGalleryImages(e.target.value.split(",").map(img => img.trim()))}
          className="border p-2 w-full"
        />
      </div>

      {/* Sección de Grosores */}
      <div>
        <h3 className="text-lg font-semibold">Grosores</h3>
        {grosores.map((grosoresItem, index) => (
          <div key={index} className="flex gap-4 items-center">
            <input
              type="number"
              value={grosoresItem.cantidad || ""}
              onChange={(e) => handleGrosorChange(index, "cantidad", e.target.value)}
              placeholder="Cantidad"
              className="border p-2"
            />
            <input
              type="number"
              value={grosoresItem.precio || ""}
              onChange={(e) => handleGrosorChange(index, "precio", e.target.value)}
              placeholder="Precio"
              className="border p-2"
            />
            <button type="button" onClick={() => handleRemoveGrosor(index)} className="text-red-500">
              Eliminar
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddGrosor} className="text-blue-500">
          Añadir Grosor
        </button>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Guardar Cambios
      </button>
      
    </form>
    </div>
  );
};

export default EditForm;
