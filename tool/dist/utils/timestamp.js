const ONE_DAY = 60 * 60 * 24;
export const oneDayLater = () => {
    return (Math.floor(Date.now() / 1000) + ONE_DAY).toString();
};
