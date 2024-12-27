// src/loaders.js
export async function paymentLoader({ params }) {
  const response = await fetch(`https://health-care-server-0t0x.onrender.com/api/appointment/booking/${params.id}`);
  if (!response.ok) {
    throw new Error('Failed to load booking data');
  }
  return response.json();
}
