export default function removeNullValues(obj) {
    for (const key in obj) {
        if (obj[key] === null) {
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            removeNullValues(obj[key]);

            // After removing null values, if the object becomes empty, delete the property
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
        }
    }
}
