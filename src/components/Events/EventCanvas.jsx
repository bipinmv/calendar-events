import { useEffect, useRef } from "react";

const EventCanvas = ({ events }) => {
  const canvasRef = useRef(null);
  const eventHeight = 50; // Height of each event rectangle
  const eventGap = 10; // Gap between events
  const timeColumnWidth = 80; // Width of the time column
  const eventMargin = 5; // Margin for event text

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sort events by start time
    const sortedEvents = events.sort((a, b) => a.startTime - b.startTime);

    // Calculate canvas dimensions based on maximum event end time
    const maxEndTime = Math.max(...sortedEvents.map((event) => event.endTime));
    canvas.width =
      timeColumnWidth + sortedEvents.length * (eventHeight + eventGap);
    canvas.height = maxEndTime * (eventHeight + eventGap) + eventGap;

    // Draw time column
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, timeColumnWidth, canvas.height);

    // Draw time labels
    ctx.fillStyle = "#333";
    ctx.font = "12px Arial";
    for (let i = 0; i <= maxEndTime; i++) {
      const timeText = `${i}:00`;
      ctx.fillText(timeText, 5, i * (eventHeight + eventGap) + 20);
    }

    // Draw events on canvas
    sortedEvents.forEach((event, index) => {
      const x = timeColumnWidth + index * (eventHeight + eventGap);
      const y = event.startTime * (eventHeight + eventGap);
      const width = eventHeight;
      const height = (event.endTime - event.startTime) * eventHeight;

      ctx.fillStyle = "#3498db";
      ctx.fillRect(x, y, width, height);

      // Draw event text
      ctx.fillStyle = "#ffffff";
      ctx.fillText(event.title, x + eventMargin, y + eventMargin);
    });
  }, [events]);

  return <canvas ref={canvasRef} />;
};

export default EventCanvas;