export const isValidCache = cacheObject => {
    if (!cacheObject || !cacheObject.lastUpdate) {
        return false;
    }

    const objectDate = new Date(cacheObject.lastUpdate);
    const now = new Date();
    if ( now - objectDate > 100000) {
        // object is expired
        return false;
    }

    return true;
}