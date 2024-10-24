export const placeholderImage = (w?: string | number, h?: string | number) =>
  `https://backend.purplleface.com/assets/placeholder__preview.jpg?h=400&w=400`;

export default function resolveImage(
  image?: string,
  w?: string | number,
  h?: string | number,
) {
  if (!image) {
    return placeholderImage(w, h);
  }

  if (!h && !w) {
    return image;
  }

  if (!h) {
    return `${image}?w=${w}`;
  }

  if (!w) {
    return `${image}?h=${h}`;
  }

  return `${image}?w=${w}&h=${h}`;
}
