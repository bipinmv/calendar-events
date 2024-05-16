import "./Events.css";

const Events = ({ events }) => {

  return (
    <div className="events-container">
      {events.map(obj => (
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
