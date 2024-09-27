import {flattenObjectWithOrderingAndSkipKeys} from "@helpers/flattenObject";

export const ModifyObject = (
    obj: any,
    ordering: string[],
    skipKeys: string[],
    parentKey: string = '',
    arrayKeys: boolean = true, // Parameter to control array key inclusion
    isNestedRoutes: boolean = false // New parameter to control structure flattening
): any => {
    if (typeof obj !== 'object' || obj === null) return obj;

    // If `isNestedRoutes` is false, apply the flattening logic and ensure ordering and skipKeys work
    if (!isNestedRoutes) {
        return flattenObjectWithOrderingAndSkipKeys(obj, ordering, skipKeys, parentKey);
    }

    const orderedKeys: string[] = [];
    const unorderedKeys: string[] = [];

    Object.keys(obj).forEach((key) => {
        const fullPath = parentKey ? `${parentKey}.${key}` : key;

        // Skip keys that are in skipKeys array
        if (skipKeys.some(skipKey => fullPath === skipKey || fullPath.startsWith(skipKey))) {
            return; // Skip this key and continue
        }

        // If the full key (including nested path) is in ordering, put it in orderedKeys
        if (ordering.some(orderKey => orderKey === fullPath || orderKey.startsWith(fullPath))) {
            orderedKeys.push(key);
        } else {
            unorderedKeys.push(key);
        }
    });

    // Sort ordered keys based on ordering array
    orderedKeys.sort((a, b) => {
        const pathA = parentKey ? `${parentKey}.${a}` : a;
        const pathB = parentKey ? `${parentKey}.${b}` : b;
        return ordering.indexOf(pathA) - ordering.indexOf(pathB);
    });

    // Reorder the object recursively
    const result: Record<string, any> = {};

    [...orderedKeys, ...unorderedKeys].forEach((key) => {
        const value = obj[key];

        // Check if the value is an array
        if (Array.isArray(value)) {
            if (arrayKeys) {
                // If arrayKeys is true, include the array indices in the result
                result[key] = {};
                value.forEach((item, index) => {
                    result[key][index] = ModifyObject(item, ordering, skipKeys, `${parentKey}.${key}`, arrayKeys, isNestedRoutes);
                });
            } else {
                // If arrayKeys is false, just return the array values without indices
                result[key] = value.map((item) =>
                    ModifyObject(item, ordering, skipKeys, `${parentKey}.${key}`, arrayKeys, isNestedRoutes)
                );
            }
        } else {
            // Recurse for non-array objects
            result[key] = ModifyObject(value, ordering, skipKeys, parentKey ? `${parentKey}.${key}` : key, arrayKeys, isNestedRoutes);
        }
    });

    return result;
};
