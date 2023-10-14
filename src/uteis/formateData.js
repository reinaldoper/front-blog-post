import { format } from 'date-fns';

const formatDate = (dateString) => {
  const data = new Date(dateString);
  const result = format(data, 'dd/MM/yyyy H:mm:ss');
  return result;
}

export default formatDate;