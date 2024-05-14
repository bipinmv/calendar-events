export const getFormattedDate = timestampString => {
  const timestamp = new Date(timestampString);

  const options = {
    weekday: 'short',
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  return timestamp.toLocaleString("en-US", options).replaceAll(",", "");
};

export const getFormattedDatetime = timestampString => {
  const timestamp = new Date(timestampString);

  const options = {
    // weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return timestamp.toLocaleString("en-US", options);
};
