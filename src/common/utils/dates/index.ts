export const getCurrentMonth = (currentDate: Date): string => {
  const currMonth = currentDate.getMonth() + 1;
  if (currMonth <= 9) return `0${currMonth}`;
  return String(currMonth);
};

export const getCurrentDay = (currentDate: Date): string => {
  const currDay = currentDate.getDate();
  if (currDay <= 9) return `0${currDay}`;
  return String(currDay);
};

export const getCurrentHours = (currentDate: Date): string => {
  const currHours = currentDate.getHours();
  if (currHours <= 9) return `0${currHours}`;
  return String(currHours);
};

export const getCurrentMinutes = (currentDate: Date): string => {
  const currMinutes = currentDate.getMinutes();
  if (currMinutes <= 9) return `0${currMinutes}`;
  return String(currMinutes);
};

export const getCurrentSeconds = (currentDate: Date): string => {
  const currSeconds = currentDate.getSeconds();
  if (currSeconds <= 9) return `0${currSeconds}`;
  return String(currSeconds);
};

export const getCurrentISODate = () => {
  const date = new Date();
  const COLOMBIAN_ZERO_TIME = ".350Z";
  return new Date(
    `${date.getFullYear()}-${getCurrentMonth(date)}-${getCurrentDay(
      date
    )}T${getCurrentHours(date)}:${getCurrentMinutes(date)}:${getCurrentSeconds(
      date
    )}${COLOMBIAN_ZERO_TIME}`
  );
};
