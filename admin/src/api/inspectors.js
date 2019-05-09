import axios from 'axios';

const inspectorsFetch = axios.create({
    baseURL: 'http://localhost:3003/',
});

/**
 * Get all inspectors
 * @return {AxiosPromise<AxiosResponse>}
 */
export async function getAllInspectors() {
    const {data} = await inspectorsFetch.get('/inspectors');
    return data;
}

/**
 * Get nearest inspector based on coordinates
 * @param {Number} lat - Latitude
 * @param {Number} lon - Longitude
 * @return {AxiosPromise<AxiosResponse>}
 */
export function getNearestInspector(lat, lon) {
    return inspectorsFetch.get('/inspectors/nearest', {
        params: {lat, lon},
    });
}

/**
 * Add new inspector
 * @param {Object} body - Body data
 * @return {AxiosPromise<AxiosResponse>}
 */
export function addInspector(body) {
    return inspectorsFetch.post('/inspectors', body);
}

