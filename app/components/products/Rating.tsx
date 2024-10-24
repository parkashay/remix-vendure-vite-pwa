import { classNames } from '~/utils/class-names';

export default function Rating({ rating }: { rating: number }) {
  const maxRating = 5;

  const normalizedRating = Math.min(Math.max(0, rating), maxRating); // 3.5
  const fullStars = Math.floor(normalizedRating); // 3
  const fractionalStar = normalizedRating - fullStars; // 0.5
  const hasFractionalStar = fractionalStar > 0; // true
  const remainingStars = maxRating - fullStars - (hasFractionalStar ? 1 : 0); // 1

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} />);
  }

  if (hasFractionalStar) {
    stars.push(<Star key={fullStars} fraction={fractionalStar} />);
  }

  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <Star key={fullStars + (hasFractionalStar ? 1 : 0) + i} fraction={0} />,
    );
  }

  return <div className="flex items-center space-x-px">{stars}</div>;
}

function Star({ fraction = 1 }: { fraction?: number }) {
  return (
    <div className="relative">
      <svg
        className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      {fraction > 0 && (
        <svg
          className={classNames(
            'w-3 h-3 sm:w-4 sm:h-4 absolute inset-0',
            fraction == 0 ? 'text-gray-400' : 'text-yellow-400',
          )}
          style={{
            clipPath: `polygon(0 0, ${fraction * 100}% 0, ${
              fraction * 100
            }% 100%, 0 100%)`,
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </div>
  );
}
