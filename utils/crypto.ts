// Helper to convert ArrayBuffer to Base64URL string (for storing in JSON)
export function bufferToString(buff: ArrayBuffer): string {
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(buff))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Helper to convert Base64URL string back to ArrayBuffer (for WebAuthn API)
export function stringToBuffer(str: string): ArrayBuffer {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (base64.length % 4)) % 4;
  const padded = base64.padEnd(base64.length + padLength, "=");
  const binary_string = atob(padded);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}
