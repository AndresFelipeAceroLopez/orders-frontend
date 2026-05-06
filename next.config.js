/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eliminamos 'turbo' porque estaba causando el Warning en tu consola
  async rewrites() {
    // Si la variable BACKEND_URL existe (Producción), usa esa. 
    // Si no, usa el puerto 8000 de tu PC (Desarrollo local).
    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000';
    
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
