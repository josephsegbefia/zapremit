import { format, parseISO } from 'date-fns';

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'MMMM d, yyyy h:mm a');
};

export default formatDate;
