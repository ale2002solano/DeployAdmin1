import UploadModal from "../../createProduct/components/subirFotos";
import Image from 'next/image';
import React,{useState} from "react";


export default function EditMaterial () {
    const [productType,setProductType] = useState("Producto sin talla");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [isGallery, setIsGallery] = useState(false);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [keywordInput, setkeywordInput] = useState("");
    const [keywords, setkeywords] = useState<string[]>([]);
    const handleRemoveGalleryImage = (url: string) => {
        setGalleryImages((prevImages) => prevImages.filter((img) => img !== url));
      };
      const handleProductTypeChange = (type: string) => setProductType(type);
    

      const handleOpenModal = (forGallery: boolean) => {
        setIsGallery(forGallery);
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => setIsModalOpen(false);
      
      const handleImageUpload = (urls: string[]) => {
        if (isGallery) {
          setGalleryImages(urls);
        } else {
          setMainImage(urls[0] || null);
        }
        handleCloseModal();
      };


      const handleKeywordAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
            setkeywords([...keywords, keywordInput.trim()]);
            setkeywordInput("");
          }
        }
      };
    
      const handleKeywordRemove = (keyword: string) => {
        setkeywords((prevKeywords) => prevKeywords.filter((cat) => cat !== keyword));
      };


    return (
        <div className="p-8 bg-gray-50 rounded-lg shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-koulen mb-6 text-black">Editar Materiales</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" >
  
          {/* Tipo Producto Accordion */}
          <div className="space-y-6">
            <label className="block text-sm font-medium text-black">Tipo Producto</label>
            <div className="flex space-x-4">
              <select
                id="productType"
                value={productType}
                onChange={(e) => handleProductTypeChange(e.target.value)}
                className="p-2 border w text-black rounded-lg w-full"
              >
                <option className="text-black" value="Producto sin talla">Material sin Grosor</option>
                <option value="Producto con talla">Material con grosor</option>
              </select>
            </div>
  
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
              <input
                type="text"
                required
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full text-black"
                placeholder="Escribe el nombre del producto"
              />
            </div>
            {/* Price and Stock */}
            {productType === "Producto sin talla" ? (
              <div>
                    
                <div className="grid grid-cols-2 gap-4 mt-[24px]">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 ">Precio</label>
                          <input
                            type="number"
                            required
                            className="mt-2 p-2 text-black border border-gray-300 rounded-lg w-full"
                            placeholder="Precio en Lempiras"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                          <input
                            type="number"
                            required
                            className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                            placeholder="Cantidad disponible"
                            min="0"
                          />
                        </div>
                </div>
                </div>
                ) : (
                  <div className="mt-4 space-y-4">
                  {["LACE", "SUPERFINE", "FINE", "LIGHT", "MEDIUM", "BULKY", "SUPERBULKY", "JUMBO"].map((size) => (
                    <div key={size} className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Precio {size}</label>
                        <input
                          type="number"
                          className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                          placeholder="Precio en Lempiras"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Cantidad {size}</label>
                        <input
                          type="number"
                          className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                          placeholder="Cantidad disponible"
                          min="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                          )}
            {/*Marca */}
            <div>
                 <label className="block text-sm font-medium text-gray-700">Marca</label>
                    <textarea
                      required
                      className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                      placeholder="Escribe la marca"
                      />
            </div>              
  
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                required
                className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                placeholder="Describe el producto"
              />
            </div>
            
            {/* Keywoard Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Keyword</label>
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setkeywordInput(e.target.value)}
                required
                onKeyDown={handleKeywordAdd}
                className="mt-2 p-2 border text-black border-gray-300 rounded-lg w-full"
                placeholder="Escribe y presiona Enter o Espacio para agregar"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keywords, index) => (
                  <span key={index} className="bg-gray-200 text-black px-2 py-1 rounded-full text-sm flex items-center">
                    {keywords}
                    <button
                      type="button"
                      onClick={() => handleKeywordRemove(keywords)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
  
          {/* Right Column - Image Uploads */}
          <div className="space-y-6">
            {/* Main Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Foto Principal del Producto</label>
              <div
                className="mt-2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
                onClick={() => handleOpenModal(false)}
              >
                {mainImage ? (
                  <Image src={mainImage} alt="Main Preview" width={250} height={250} className="mx-auto" style={{ width: 'auto', height: 'auto' }}/>
                ) : (
                  <p>Click para cargar imagen principal</p>
                )}
              </div>
            </div>
  
            {/* Gallery Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Galería de Producto</label>
              <div
                className="mt-2 border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
                onClick={() => handleOpenModal(true)}
              >
                {galleryImages.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImages.map((imgUrl, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={imgUrl}
                          alt={`Gallery Preview ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full max-w-[100px]"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                        <button
                          onClick={() => handleRemoveGalleryImage(imgUrl)}
                          className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Click para cargar imágenes de galería</p>
                )}
              </div>
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="col-span-2 flex justify-end space-x-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              onClick={() => {
                
              }}
            >
              Cancelar
            </button>
            <button
                type="button" // Change to "button" to avoid implicit form submission
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                 
              >
                Actualizar
              </button>
  
          </div>
        </form>
  
        {/* Upload Modal */}
        {isModalOpen && (
          <UploadModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onImageUpload={handleImageUpload}
            existingImages={isGallery ? galleryImages : mainImage ? [mainImage] : []}
            isGallery={isGallery}
          />
        )}
      </div>
    )
}