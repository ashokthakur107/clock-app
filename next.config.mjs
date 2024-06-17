/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
  async exportPathMap(defaultPathMap) {
    // Remove API routes from the path map
    const pathMap = { ...defaultPathMap };
    delete pathMap['/api/timer/[id]'];
    return pathMap;
  },
};

export default nextConfig;
