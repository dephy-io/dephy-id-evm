const ONE_HOUR = 60 * 60;
const ONE_DAY = 60 * 60 * 24;
export const oneHourLater = () => {
    return (Math.floor(Date.now() / 1000) + ONE_HOUR).toString();
};
export const oneDayLater = () => {
    return (Math.floor(Date.now() / 1000) + ONE_DAY).toString();
};
