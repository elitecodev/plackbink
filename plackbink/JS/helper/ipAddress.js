export const getIP = () => {
    return new Promise((resolve, reject) => {
        fetch("https://api64.ipify.org?format=json")
            .then(response => response.json())
            .then(data => resolve(data.ip))
            .catch(error => reject("Error fetching IP: " + error));
    });
};

export const getIPLocation = () => {
    return new Promise((resolve, reject) => {
        fetch("https://ipapi.co/json/")
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject("Error fetching IP location: " + error));
    });
};
