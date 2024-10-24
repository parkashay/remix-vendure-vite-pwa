import { useActiveOrder } from '~/utils/use-active-order';

interface QuantityAdjusterProps {
  lineId: string;
  quantity: number;
}
export function QuantityAdjuster({ lineId, quantity }: QuantityAdjusterProps) {
  const { activeOrderFetcher } = useActiveOrder();
  const handleAdjustQuantity = (lineId: string, quantity: string) => {
    activeOrderFetcher.submit(
      {
        action: 'adjustItem',
        lineId,
        quantity,
      },
      {
        method: 'post',
        action: '/api/active-order',
      },
    );
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        className="bg-primary/10 rounded px-2 py-1.5 cursor-pointer"
        onClick={() =>
          handleAdjustQuantity(lineId, String(Math.max(0, quantity - 1)))
        }
        disabled={quantity <= 0}
      >
        -
      </button>
      <input
        type="text"
        disabled
        value={quantity}
        className="w-[50px] rounded text-center"
      />
      <button
        type="button"
        className="bg-primary/10 rounded px-2 py-1.5 cursor-pointer"
        onClick={() =>
          handleAdjustQuantity(lineId, String(Math.min(10, quantity + 1)))
        }
        disabled={quantity >= 10}
      >
        +
      </button>
    </div>
  );
}
