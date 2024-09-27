
// Flattening logic to be used when `isNestedRoutes` is false, with `ordering` and `skipKeys` handling
export const flattenObjectWithOrderingAndSkipKeys = (
    obj: any,
    ordering: string[],
    skipKeys: string[],
    parentKey = ''
): Record<string, any> => {
    let result: Record<string, any> = {};

    const orderedKeys: string[] = [];
    const unorderedKeys: string[] = [];

    // Process keys for ordering and skipping
    Object.keys(obj).forEach((key) => {
        const fullPath = parentKey ? `${parentKey} ${key}`.trim() : key.trim();

        // Skip keys that are in skipKeys
        if (skipKeys.some(skipKey => fullPath === skipKey || fullPath.startsWith(skipKey))) {
            return; // Skip this key
        }

        // Separate ordered keys and unordered keys
        if (ordering.some(orderKey => orderKey === fullPath || orderKey.startsWith(fullPath))) {
            orderedKeys.push(key);
        } else {
            unorderedKeys.push(key);
        }
    });

    // Sort ordered keys based on the ordering array
    orderedKeys.sort((a, b) => {
        const pathA = parentKey ? `${parentKey} ${a}`.trim() : a;
        const pathB = parentKey ? `${parentKey} ${b}`.trim() : b;
        return ordering.indexOf(pathA) - ordering.indexOf(pathB);
    });

    // Iterate through ordered and unordered keys
    [...orderedKeys, ...unorderedKeys].forEach((key) => {
        const value = obj[key];
        const newKey = parentKey ? `${parentKey} ${key}`.trim() : key.trim();

        // Recursively flatten objects
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(result, flattenObjectWithOrderingAndSkipKeys(value, ordering, skipKeys, newKey));
        } else if (Array.isArray(value)) {
            // Flatten arrays, including index in the key
            value.forEach((item, index) => {
                const arrayKey = `${newKey} [${index}]`.trim();
                if (typeof item === 'object' && item !== null) {
                    Object.assign(result, flattenObjectWithOrderingAndSkipKeys(item, ordering, skipKeys, arrayKey));
                } else {
                    result[arrayKey] = item;
                }
            });
        } else {
            // Handle primitive values
            result[newKey] = value;
        }
    });

    return result;
};
