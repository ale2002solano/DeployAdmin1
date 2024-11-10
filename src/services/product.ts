
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