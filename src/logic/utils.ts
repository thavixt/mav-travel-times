/**
 * Sleep for ms miliseconds
 * 
 * If `ms` is omitted, it sleeps for a random time between 1-2 seconds - use for dev/debug
 */
export const sleep = (ms?: number) => {
  let sleepMs = ms;
  if (!sleepMs) {
    sleepMs = 1000 + Math.random() * 1000;
  }
  return new Promise(res => setTimeout(res, sleepMs));
}
