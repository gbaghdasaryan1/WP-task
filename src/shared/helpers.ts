export const convertTimestampToDateFormat = (timestamp: number) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    const formattedDate = `${padZero(day)}/${padZero(month)}/${padZero(year)}`;

    return formattedDate;
};

export const padZero = (value: number) => {
    return value.toString().padStart(2, "0");
};
