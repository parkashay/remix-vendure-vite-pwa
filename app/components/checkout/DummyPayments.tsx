import { CreditCardIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Form } from '@remix-run/react';
import { EligiblePaymentMethodsQuery } from '~/generated/graphql';
import Button from '../Button';

export function DummyPayments({
  paymentMethod,
  paymentError,
}: {
  paymentMethod: EligiblePaymentMethodsQuery['eligiblePaymentMethods'][number];
  paymentError?: string;
}) {
  console.log({ paymentMethod });
  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-600 text-sm p-6">
        This is a dummy payment for demonstration purposes only
      </p>
      {paymentError && (
        <div className="rounded-md bg-red-50 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There was an error processing the payment
              </h3>
              <div className="mt-2 text-sm text-red-700">{paymentError}</div>
            </div>
          </div>
        </div>
      )}
      <Form method="post">
        <input
          type="hidden"
          name="paymentMethodCode"
          value={paymentMethod.code}
        />
        <Button size="xl" fullWidth type="submit">
          <CreditCardIcon className="w-5 h-5"></CreditCardIcon>
          <span>Pay with {paymentMethod.name}</span>
        </Button>
      </Form>
    </div>
  );
}
