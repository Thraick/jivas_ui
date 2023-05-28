import LRUCache from 'lru-cache';
export const cache = new LRUCache({

    max: 500,

    // for use with tracking overall storage size
    maxSize: 5000,

    sizeCalculation: (value, key) => {
        return 1
    },


    ttl: 1000 * 60 * 5,
    // ignoreFetchAbort: true,
    // allowStaleOnFetchAbort: true,
    // ttlAutopurge: true,
    allowStale: false

})

// this will return the stale value after 100ms, while still
// updating in the background for next time.

// export const cache = new LRUCache<string, CacheValue>(options);


export const localStorageService = {
    setItem(key: string, value: any) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },
    getItem(key: string) {
        if (typeof localStorage !== 'undefined') {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        }
        return null;
    },
    removeItem(key: string) {
        localStorage.removeItem(key);
    },
};

