export function toProperCase(input: string) {
  if (!input) return null;
  input = input[0].toUpperCase() + input.substr(1);
  return input;
}

export async function isUrlExist(url: string) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res && res.ok) {
      return true;
    }
  }
  catch (err) {
    console.log(err);
  };
  return false;
}