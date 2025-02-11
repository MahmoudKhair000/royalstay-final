// const fs = require('fs');

// Define the start and end dates
const startDate = new Date('2025-02-01');
const endDate = new Date('2025-02-10');

// Function to generate all dates between two dates
const getDatesBetween = (start, end) => {
  let dates = [];
  let currentDate = new Date(start);

  while (currentDate <= end) {
    dates.push(new Date(currentDate).toISOString().split('T')[0]); // Format: YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
  return dates;
};

// Generate the dates and save them to a file
const datesBetween = getDatesBetween(startDate, endDate);
// fs.writeFileSync('dates_between.json', JSON.stringify(datesBetween, null, 2));

console.log('Dates saved to dates_between.json:', datesBetween);
