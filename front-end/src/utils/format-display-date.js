/*export default function formatDisplayDate(date, format) {
    //const dateTime = `${date}T00:00:00`;
    const dateObject = new Date(date + 'T00:00:00Z');

    console.log('formatDisplayDate received date:', date);
    console.log('Date object created in formatDisplayDate:', dateObject.toISOString());


    if (format === "short") {
        const gotDate = dateObject.getDate();
        const gotDay = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
    }).format(dateObject);
        const gotMonth = new Intl.DateTimeFormat("en-US", {
            month: "short",
        }).format(dateObject);

        return `${gotMonth} ${gotDate} (${gotDay}) `;
    }
    
    else if (format === "long") {
        return dateObject.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
    });
    } else {
        return dateObject.toDateString();
    }
}*/

// This utility file is used to format dates for display in the UI.

export default function formatDisplayDate(date, format) {
    // Create a date object from the input date string in UTC
    const dateObject = new Date(date + 'T00:00:00.000Z');
    console.log('formatDisplayDate received date:', date);
    console.log('Date object created in formatDisplayDate:', dateObject.toISOString());

    if (format === "short") {
        const options = { month: 'numeric', day: 'numeric', timeZone: 'UTC' };
        return dateObject.toLocaleDateString('en-US', options);
      } else if (format === "long") {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            timeZone: 'UTC' 
        };
        return new Intl.DateTimeFormat('en-US', options).format(dateObject);
      } else {
        return dateObject.toUTCString();
      }
    }