export const formatKey = (key: string) => {
    // Split by underscores, hyphens, and camelCase transitions
    return key
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Handle camelCase and PascalCase (insert space between lowercase and uppercase)
        .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
        .split(' ') // Split by space (now we have the words)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words back with a space
};
