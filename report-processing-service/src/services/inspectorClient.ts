const request = require('request-promise');

export class InspectorClient {
    constructor(private url: string) {

    }

    public async getNearest(location: any) {
        return request({
            json: true,
            uri: `${this.url}/inspectors/nearest?lat=${location.lat}&lon=${location.lon}`
        });
    }
}
