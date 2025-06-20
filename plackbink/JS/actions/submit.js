import { getIP, getIPLocation } from '../helper/ipAddress.js';
import { generateUser } from '../helper/createUser.js';

export const onSubmit = (database, text, file, base64) => {
    if (text.length) {
        const storedLocation = JSON.parse(localStorage.getItem("ipLocation"));

        if (storedLocation) {
            getIP().then(ipAddress => {
                const newQuoteRef = database.ref(`slader/${Date.now()}`);
                const quoteObject = {
                    name: `tendercare_03`,
                    quote: text,
                    file: file,
                    base64: base64,
                    isFile: !!file,
                    isPinned: false,
                    isReported: false,
                    ip: (ipAddress.length > 16) ? `0.0.0.0` : ipAddress,
                    location: `${storedLocation.city}, ${storedLocation.country}`,
                    timestamp: Date.now()
                };

                newQuoteRef.set(quoteObject)
                    .then().catch((error) => {
                        console.error('Error adding quote: ', error);
                    });
            }).catch(error => console.error("Error fetching IP:", error));
        } else {
            console.error("No location data found in sessionStorage.");
        }
    }
};
