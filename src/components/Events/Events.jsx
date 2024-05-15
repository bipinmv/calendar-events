import "./Events.css"

const Events = ({ date, events }) => {
  const eventDate = new Date(date).toLocaleDateString();
  const currentEvent = events.filter(event => eventDate === event.date);

  return (
    <div className="events-container">
      {currentEvent.map(obj => (
        <div
          key={obj.title + obj.startTime}
          style={{ backgroundColor: obj.color }}
          className="mt-1 font-10 p-1 text-ellipsis"
        >
          {obj.title}
        </div>
      ))}
    </div>
  );
};

export default Events;
