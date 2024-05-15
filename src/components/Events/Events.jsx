import { EVENTS } from "../../constants/constants";

const Events = ({ date }) => {
  const eventDate = new Date(date).toLocaleDateString();
  const events = EVENTS.filter(event => eventDate === event.date);

  return (
    <>
      {events.map(obj => (
        <div
          key={obj.title + obj.startTime}
          style={{ backgroundColor: obj.color }}
          className="mt-1 font-10 p-1 text-ellipsis"
        >
          {obj.title}
        </div>
      ))}
    </>
  );
};

export default Events;
