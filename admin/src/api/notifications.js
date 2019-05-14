import axios from 'axios';

const notificationsFetch = axios.create({
    baseURL: 'http://192.168.99.100:3004/',
});

/**
 * Get all notifications
 * @return {AxiosPromise<AxiosResponse>}
 */
export async function getAllNotifications() {
    return  notificationsFetch.get('/notifications');
}
