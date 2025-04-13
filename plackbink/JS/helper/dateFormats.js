export const getDay = () => {
    const now = new Date();
    const utcDay = String(now.getUTCDate()).padStart(2, '0');
    const utcMonth = String(now.getUTCMonth() + 1).padStart(2, '0');
    const utcYear = String(now.getUTCFullYear()).slice(-2);

    return `${utcMonth}_${utcDay}_${utcYear}`;
};
