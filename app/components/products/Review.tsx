import { useParams } from '@remix-run/react';
import Rating from './Rating';

export interface Review {
  id: number;
  title: string;
  rating: number;
  content: string;
  author: string;
  date: string;
}

export default function Review({
  title,
  rating,
  content,
  author,
  date,
}: Review) {
  const params = useParams();
  return (
    <div className="flex space-x-6">
      <img
        src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${author}-${params.slug}`}
        alt="author"
        className="w-11 h-11 rounded-full"
        style={{
          minWidth: '2.75rem',
          minHeight: '2.75rem',
        }}
      />
      <div>
        <Rating rating={rating} />
        <div className="mt-6 text-zinc-900 text-base">
          <h1 className="font-bold mb-2">{title}</h1>
          {content}
        </div>
        <div className="mt-5 font-bold text-sm text-zinc-900">{author}</div>
        <div className="mt-1 text-sm text-zinc-500">{date}</div>
      </div>
    </div>
  );
}
