export function toProperCase(input: string) {
  input = input[0].toUpperCase() + input.substr(1);
  return input;
}