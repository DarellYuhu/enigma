export default function imageLoader({ src }: { src: string }) {
  return `https://img.youtube.com/vi/${src}/0.jpg`;
}

export function customLoader({ src }: { src: string }) {
  return `${src}`;
}
