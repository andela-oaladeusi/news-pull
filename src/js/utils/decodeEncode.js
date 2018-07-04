import base64 from 'base-64';
import utf8 from 'utf8';

export function encodeUrl(url) {
  const bytes = utf8.encode(url);
  return base64.encode(bytes);
}

export function decodeUrl(text) {
  const bytes = base64.decode(text);
  return utf8.decode(bytes);
}

