/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // <=== enables static exports
    async exportPathMap(defaultPathMap) {
        // Remove API routes from the path map
        const pathMap = { ...defaultPathMap };
        delete pathMap['/api/timer/[id]'];
        return pathMap;
      },
    reactStrictMode: true,
};

export default nextConfig;
