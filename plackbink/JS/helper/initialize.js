import { getIPLocation } from './ipAddress.js';
import { generateUser } from './createUser.js';

export const init = (callback) => {
    sessionStorage.setItem(`currUser`, "tendercare_03");
    const storedLocation = localStorage.getItem("ipLocation");

    if (storedLocation) {
        callback();
    } else {
        getIPLocation()
            .then(location => {
                console.log(location)
                localStorage.setItem("ipLocation", JSON.stringify({
                    country: location.country,
                    city: location.city,
                    ip: location.ip,
                    region: location.region,
                    latitude: location.latitude,
                    longitude: location.longitude
                }));
                callback();
            })
            .catch(error => console.error(error));
    }
}


