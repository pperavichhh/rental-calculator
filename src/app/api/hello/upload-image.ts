import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const imageData = req.body.data;
    const imageName = req.body.name;

    // Save the image to the server
    const response = await axios.post('https://rental-calculation.vercel.app/images/', { data: imageData, name: imageName });

    if (response.status === 200) {
      // If the image was saved successfully, return the image URL
      const imageUrl = `https://rental-calculation.vercel.app/images/${imageName}`;
      res.status(200).json({ url: imageUrl });
    } else {
      // If there was an error saving the image, return an error message
      res.status(500).json({ message: 'Failed to save image' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function saveImages(imageDataArray: string[]): Promise<string[]> {
  const imageUrls: string[] = [];

  for (let i = 0; i < imageDataArray.length; i++) {
    const imageData = imageDataArray[i];

    // Generate a unique file name for the image
    const imageName = `image-${i + 1}.jpg`;

    // Send a request to the server to save the image
    const response = await axios.post('/api/upload-image', { data: imageData, name: imageName });

    if (response.status === 200) {
      // If the image was saved successfully, add the URL to the list of image URLs
      const imageUrl = `https://rental-calculation.vercel.app/images/${imageName}`;
      imageUrls.push(imageUrl);
    } else {
      // If there was an error saving the image, throw an error
      throw new Error('Failed to save image');
    }
  }

  // Return the list of image URLs
  return imageUrls;
}
