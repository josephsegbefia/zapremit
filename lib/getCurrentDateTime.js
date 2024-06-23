function getCurrentDateTime() {
  const now = new Date();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get date components
  const year = now.getFullYear();
  const month = monthNames[now.getMonth()]; // Get month name
  const day = now.getDate();

  // Get time components and format to 12-hour clock
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert hour '0' to '12'

  // Combine date and time components
  const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;

  return formattedDate;
}

export default getCurrentDateTime;
