const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dmljrga3a';
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'vaibhav_uploads';

export const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'vaibhav-enterprises');

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Image upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};
