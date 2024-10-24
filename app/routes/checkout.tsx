import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Outlet, useLocation, useOutletContext } from '@remix-run/react';
import Container from '~/components/Container';
import { CartContents } from '~/components/cart/CartContents';
import { CartTotals } from '~/components/cart/CartTotals';
import { OutletContext } from '~/types';

const steps = [
  { name: 'Shipping', state: 'shipping' },
  { name: 'Payment', state: 'payment' },
  { name: 'Confirmation', state: 'confirmation' },
];

export default function Checkout() {
  const outletContext = useOutletContext<OutletContext>();
  const { activeOrder, adjustOrderLine, removeItem } = outletContext;
  const location = useLocation();
  let state = 'shipping';
  if (location.pathname === '/checkout/payment') {
    state = 'payment';
  } else if (location.pathname.startsWith('/checkout/confirmation')) {
    state = 'confirmation';
  }
  let isConfirmationPage = state === 'confirmation';

  return (
    <Container>
      <div className="py-8">
        <h2 className="sr-only">Checkout</h2>
        <nav
          aria-label="Progress"
          className="hidden sm:block pb-8 mb-8 border-b border-zinc-400"
        >
          <ol role="list" className="flex space-x-4 justify-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="flex items-center">
                {step.state === state ? (
                  <span aria-current="page" className="text-primary-600">
                    {step.name}
                  </span>
                ) : (
                  <span>{step.name}</span>
                )}

                {stepIdx !== steps.length - 1 ? (
                  <ChevronRightIcon
                    className="w-5 h-5 text-gray-300 ml-4"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div
            className={
              isConfirmationPage ? 'lg:col-span-2 max-w-2xl w-full mx-auto' : ''
            }
          >
            <Outlet context={outletContext} />
          </div>

          {/* Order summary */}
          {!isConfirmationPage && (
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order summary
              </h2>

              <CartContents
                orderLines={activeOrder?.lines ?? []}
                currencyCode={activeOrder?.currencyCode!}
                editable={state === 'shipping'}
                removeItem={removeItem}
                adjustOrderLine={adjustOrderLine}
              ></CartContents>
              <CartTotals order={activeOrder}></CartTotals>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
