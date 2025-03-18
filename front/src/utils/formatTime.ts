export function formatTime(time: string): string {
    return time.replace(/^0/, "").replace(":00", "h");
  }