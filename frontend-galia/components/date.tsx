import { parseISO, format } from 'date-fns';

const Date = (props: { className?: string; dateString: string }) => {
  const date = parseISO(props.dateString);
  return (
    <time className={props.className} dateTime={props.dateString}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
};

export default Date;

