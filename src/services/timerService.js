export function convertHundredthsToReadable(time) {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const hundredths = time % 100;

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    hundredths: hundredths,
  };
}
