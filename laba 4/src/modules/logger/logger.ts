const debug: boolean = true;

export function log(message: string): void {
  if (debug) {
    console.log("[DEBUG]", message);
  }
}
