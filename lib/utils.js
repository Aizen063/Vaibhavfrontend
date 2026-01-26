export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-six-sage-18.vercel.app';
    return `${API_URL}${imagePath}`;
};
