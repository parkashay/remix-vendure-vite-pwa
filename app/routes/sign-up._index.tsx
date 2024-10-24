import { XCircleIcon } from '@heroicons/react/24/solid';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Input from '~/components/Input';
import { registerCustomerAccount } from '~/providers/account/account';
import {
  RegisterValidationErrors,
  extractRegistrationFormValues,
  validateRegistrationForm,
} from '~/utils/registration-helper';

const regDisabled = false;

export async function action({ params, request }: DataFunctionArgs) {
  if (regDisabled) {
    return {
      form: 'Registration is disabled for this demo. Please login with credentials provided in sign-in page',
    };
  }

  const body = await request.formData();
  const fieldErrors = validateRegistrationForm(body);
  if (Object.keys(fieldErrors).length !== 0) {
    return fieldErrors;
  }

  const variables = extractRegistrationFormValues(body);
  const result = await registerCustomerAccount({ request }, variables);
  console.log(variables);

  if (result.__typename === 'Success') {
    return redirect('/sign-up/success');
  } else {
    const formError: RegisterValidationErrors = {
      form: result.message,
    };
    return json(formError, { status: 401 });
  }
}

export default function SignUpPage() {
  const [searchParams] = useSearchParams();
  const formErrors = useActionData<RegisterValidationErrors>();

  return (
    <Container>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-6 text-2xl font-bold sm:text-3xl text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2  text-sm text-zinc-600">
            Or{' '}
            <Link
              prefetch="intent"
              to="/sign-in"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              login to your existing account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white sm:py-10 sm:px-8  py-6 px-4 rounded-lg shadow">
            {/* <div className="bg-primary-50 border border-primary-400 rounded p-4 text-sm">
              <p>
                Account registration is disabled for this demo. Please login
                with credentials provided in{' '}
                <Link
                  prefetch="intent"
                  to="/sign-in"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  sign-in
                </Link>{' '}
                page
              </p>
            </div> */}
            <Form className="space-y-5" method="post">
              <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get('redirectTo') ?? undefined}
              />

              <Input
                label="Email address"
                error={formErrors?.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
              />

              <Input
                label="First name"
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
              />
              <Input
                label="Last name"
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
              />

              <Input
                label="Phone number"
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                autoComplete="phone"
              />

              <Input
                label="Password"
                error={formErrors?.password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
              />

              <Input
                label="Repeat password"
                error={formErrors?.repeatPassword}
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                autoComplete="current-password"
              />

              {formErrors?.form && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        We ran into a problem while creating your account!
                      </h3>
                      <p className="text-sm text-red-700 mt-2">
                        {formErrors.form}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button fullWidth type="submit">
                Sign up
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
}
