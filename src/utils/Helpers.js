export const formatIndianDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Options for Indian locale formatting
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata", // India Standard Time
    };

    return new Intl.DateTimeFormat("en-IN", options).format(date);
};