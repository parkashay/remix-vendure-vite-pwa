import { LockClosedIcon } from '@heroicons/react/24/solid';
import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from '@remix-run/react';
import { DataFunctionArgs, redirect } from '@remix-run/server-runtime';
import { FormEvent, useState } from 'react';
import Button from '~/components/Button';
import { AddressForm } from '~/components/account/AddressForm';
import { ShippingAddressSelector } from '~/components/checkout/ShippingAddressSelector';
import { ShippingMethodSelector } from '~/components/checkout/ShippingMethodSelector';
import {
  getAvailableCountries,
  getEligibleShippingMethods,
} from '~/providers/checkout/checkout';
import { getActiveCustomerAddresses } from '~/providers/customer/customer';
import { getActiveOrder } from '~/providers/orders/order';
import { getSessionStorage } from '~/sessions';
import { OutletContext } from '~/types';
import { shippingFormDataIsValid } from '~/utils/validation';

export async function loader({ request }: DataFunctionArgs) {
  const session = await getSessionStorage().then((sessionStorage) =>
    sessionStorage.getSession(request.headers.get('Cookie')),
  );

  const activeOrder = await getActiveOrder({ request });

  //check if there is an active order if not redirect to homepage
  if (
    !session ||
    !activeOrder ||
    !activeOrder.active ||
    activeOrder.lines.length === 0
  ) {
    return redirect('/');
  }
  const { availableCountries } = await getAvailableCountries({ request });
  const { eligibleShippingMethods } = await getEligibleShippingMethods({
    request,
  });
  const { activeCustomer } = await getActiveCustomerAddresses({ request });
  const error = session.get('activeOrderError');
  return {
    availableCountries,
    eligibleShippingMethods,
    activeCustomer,
    error,
  };
}

export default function CheckoutShipping() {
  //@ts-ignore
  const { availableCountries, eligibleShippingMethods, activeCustomer, error } =
    useLoaderData<typeof loader>();
  const { activeOrderFetcher, activeOrder } = useOutletContext<OutletContext>();
  const [customerFormChanged, setCustomerFormChanged] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const fetcher = useFetcher();
  const { customer, shippingAddress } = activeOrder ?? {};
  const isSignedIn = !!activeCustomer?.id;
  const defaultFullName =
    shippingAddress?.fullName ??
    (customer ? `${customer.firstName} ${customer.lastName}` : ``);
  const canProceedToPayment =
    customer &&
    (shippingAddress?.streetLine1 || selectedAddressIndex != null) &&
    activeOrder?.shippingLines?.length &&
    activeOrder?.lines?.length &&
    activeOrder?.shippingAddress?.phoneNumber &&
    activeOrder?.shippingAddress?.phoneNumber?.length >= 10;

  console.log({ canProceedToPayment });

  const errorMessage = error?.message;

  const submitCustomerForm = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const { emailAddress, firstName, lastName } = Object.fromEntries<any>(
      formData.entries(),
    );
    const isValid = event.currentTarget.checkValidity();
    if (
      customerFormChanged &&
      isValid &&
      emailAddress &&
      firstName &&
      lastName
    ) {
      activeOrderFetcher.submit(formData, {
        method: 'post',
        action: '/api/active-order',
      });
      setCustomerFormChanged(false);
    }
  };
  const submitAddressForm = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const isValid = event.currentTarget.checkValidity();
    if (isValid) {
      setShippingAddress(formData);
    }
  };
  const submitSelectedAddress = (index: number) => {
    const selectedAddress = activeCustomer?.addresses?.[index];
    if (selectedAddress) {
      setSelectedAddressIndex(index);
      const formData = new FormData();
      Object.keys(selectedAddress).forEach((key) =>
        formData.append(key, (selectedAddress as any)[key]),
      );
      formData.append('countryCode', selectedAddress.country.code);
      formData.append('action', 'setCheckoutShipping');
      setShippingAddress(formData);
    }
  };

  function setShippingAddress(formData: FormData) {
    if (shippingFormDataIsValid(formData)) {
      activeOrderFetcher.submit(formData, {
        method: 'post',
        action: '/api/active-order',
      });
    }
  }

  const submitSelectedShippingMethod = (value?: string) => {
    if (value) {
      activeOrderFetcher.submit(
        {
          action: 'setShippingMethod',
          shippingMethodId: value,
        },
        {
          method: 'post',
          action: '/api/active-order',
        },
      );
    }
  };

  function navigateToPayment() {
    fetcher.submit(
      {
        paymentMethodCode: 'cash-on-delivery',
      },
      {
        method: 'post',
        action: '/api/add-payment-to-order',
      },
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Contact information
        </h2>

        {isSignedIn ? (
          <div>
            <p className="mt-2 text-gray-600">
              {customer?.firstName} {customer?.lastName}
            </p>
            <p>{customer?.emailAddress}</p>
          </div>
        ) : (
          <Form
            method="post"
            action="/api/active-order"
            onBlur={submitCustomerForm}
            onChange={() => setCustomerFormChanged(true)}
            hidden={isSignedIn}
          >
            <input type="hidden" name="action" value="setOrderCustomer" />
            <div className="mt-4">
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  autoComplete="email"
                  defaultValue={customer?.emailAddress}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              {error?.errorCode === 'EMAIL_ADDRESS_CONFLICT_ERROR' && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errorMessage}
                </p>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    defaultValue={customer?.firstName}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    defaultValue={customer?.lastName}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </div>

      <Form
        method="post"
        action="/api/active-order"
        onChange={submitAddressForm}
      >
        <input type="hidden" name="action" value="setCheckoutShipping" />
        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900">
            Shipping information
          </h2>
        </div>
        {isSignedIn && activeCustomer.addresses?.length ? (
          <div>
            <ShippingAddressSelector
              addresses={activeCustomer.addresses}
              selectedAddressIndex={selectedAddressIndex}
              onChange={submitSelectedAddress}
            />
          </div>
        ) : (
          <AddressForm
            availableCountries={activeOrder ? availableCountries : undefined}
            address={shippingAddress}
            defaultFullName={defaultFullName}
          ></AddressForm>
        )}
      </Form>

      <div className="mt-10 border-t border-gray-200 pt-10 mb-24">
        <ShippingMethodSelector
          eligibleShippingMethods={eligibleShippingMethods}
          currencyCode={activeOrder?.currencyCode}
          shippingMethodId={
            activeOrder?.shippingLines[0]?.shippingMethod.id ?? ''
          }
          onChange={submitSelectedShippingMethod}
        />
      </div>

      <Button
        type="button"
        size="xl"
        disabled={!canProceedToPayment}
        onClick={navigateToPayment}
        fullWidth
      >
        {!canProceedToPayment && (
          <LockClosedIcon className="w-5 h-5"></LockClosedIcon>
        )}
        <span>Confirm Order</span>
      </Button>
    </div>
  );
}
