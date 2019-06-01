import axios from "axios";

export const inspectorsFetch = axios.create({
    baseURL: 'http://localhost:3003/',
});

/**
 * Get all inspectors
 * @return {AxiosPromise<AxiosResponse>}
 */
export function getAllInspectors() {
    return inspectorsFetch.get('/inspectors');
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

/**
 * Get inspector by ID
 * @param {String} id - Inspector ID
 * @return {AxiosPromise<AxiosResponse>}
 */
export function getInspectorById(id) {
    return inspectorsFetch.get(`/inspectors/${id}`);
}

/**
 * Update inspector data
 * @param {Object} body - Body data
 * @return {AxiosPromise<AxiosResponse>}
 */
export function updateInspector(body) {
    return inspectorsFetch.patch(`/inspectors/${body._id}`, body);
}

/**
 * Delete inspector
 * @param {String} id - Inspector ID
 * @return {AxiosPromise<AxiosResponse>}
 */
export function deleteInspector(id) {
    return inspectorsFetch.delete(`/inspectors/${id}`);
}



