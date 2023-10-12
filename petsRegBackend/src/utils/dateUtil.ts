
export const futureDate = (days: number) => {
    const currentDate = new Date()
    const futureDateTimestamp = currentDate.setDate(currentDate.getDate() + days);
    const date = new Date(futureDateTimestamp);
    console.log(date.toLocaleString('sv'));
    return date;
}

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns a zero-based month, so we add 1
    const day = date.getDate();

    return `${year}/${month}/${day}`;
}

export const addDays = (date, daysToAdd) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + daysToAdd);
    return formatDate(newDate);
}

export function compareWithToday(dateString) {
    // Parse the date string
    const [year, month, day] = dateString.split('-').map(Number);

    // Create a Date object for today's date and set the time to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Midnight, start of the day
    const todayMilliseconds = today.getTime();

    // Create a Date object for the specific input date and set the time to midnight
    const specificDate = new Date(year, month - 1, day); // months are 0-based in JavaScript
    specificDate.setHours(0, 0, 0, 0); // Midnight, start of the day
    const specificDateMilliseconds = specificDate.getTime();

    return specificDateMilliseconds === todayMilliseconds || specificDateMilliseconds < todayMilliseconds

}

// Example usage:
console.log(compareWithToday("2023-11-9")); // for November 9, 2023
