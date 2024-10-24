import {
  KeyIcon,
  MapPinIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Form, Outlet, useLoaderData } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import Button from '~/components/Button';
import Container from '~/components/Container';
import { TabProps } from '~/components/tabs/Tab';
import { TabsContainer } from '~/components/tabs/TabsContainer';
import { getActiveCustomerDetails } from '~/providers/customer/customer';

export async function loader({ request }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomerDetails({ request });
  if (!activeCustomer) {
    return redirect('/sign-in');
  }
  return json({ activeCustomer });
}

export default function AccountDashboard() {
  const { activeCustomer } = useLoaderData<typeof loader>();
  const { firstName, lastName } = activeCustomer!;

  const tabs: TabProps[] = [
    {
      icon: UserCircleIcon,
      text: 'Account Details',
      to: './',
    },
    {
      icon: ShoppingBagIcon,
      text: 'Purchase History',
      to: './history',
    },
    {
      icon: MapPinIcon,
      text: 'Addresses',
      to: './addresses',
    },
    {
      icon: KeyIcon,
      text: 'Password',
      to: './password',
    },
  ];

  return (
    <Container>
      <h2 className="text-3xl sm:text-5xl font-light text-gray-900 my-8">
        My Account
      </h2>

      <div className="flex items-center  gap-2 flex-wrap">
        <p className="text-gray-700 text-lg">
          Welcome back, {firstName} {lastName}
        </p>
        <Form method="post" action="/api/logout">
          <Button type="submit" variant="ghost">
            <span className="text-red-500"> Sign out</span>
          </Button>
        </Form>
      </div>

      <TabsContainer tabs={tabs}>
        <Outlet></Outlet>
      </TabsContainer>
    </Container>
  );
}
