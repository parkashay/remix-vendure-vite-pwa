import { ArrowPathIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Link, useFetcher, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Input from '~/components/Input';
import { ErrorResult } from '~/generated/graphql';
import { login } from '~/providers/account/account';

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');
  if (typeof email === 'string' && typeof password === 'string') {
    const rememberMe = !!body.get('rememberMe');
    const redirectTo = (body.get('redirectTo') || '/account') as string;
    const result = await login(email, password, rememberMe, { request });
    if (result.__typename === 'CurrentUser') {
      return redirect(redirectTo, { headers: result._headers });
    } else {
      return json(result, {
        status: 401,
      });
    }
  }
}

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const login = useFetcher<ErrorResult>();

  return (
    <Container>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-6 text-2xl font-bold sm:text-3xl text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Or{' '}
            <Link
              prefetch="intent"
              to="/sign-up"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              register a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white sm:py-10 sm:px-8  py-6 px-4 rounded-lg shadow">
            {/* <div className="bg-primary-50 border border-primary-400 rounded p-4 text-sm">
              <p className="text-base">Demo credentials</p>
              <p>
                Email address:{' '}
                <span className="font-bold">demo@hyperce.io</span>
              </p>
              <p>
                Password: <span className="font-bold">hyperce-demo</span>
              </p>
            </div> */}
            <login.Form method="post">
              <fieldset disabled={login.state !== 'idle'} className="space-y-6">
                <input
                  type="hidden"
                  name="redirectTo"
                  value={searchParams.get('redirectTo') ?? undefined}
                />
                <div className="space-y-5">
                  <Input
                    label="Email address"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                  />
                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                      defaultChecked
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-900  cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* TODO: Forgot password */}
                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Forgot your password?
                    </a>
                  </div> */}
                </div>

                {login.data && login.state === 'idle' && (
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
                          We ran into a problem signing you in!
                        </h3>
                        <p className="text-sm text-red-700 mt-2">
                          {login.data.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Button type="submit" fullWidth>
                    <span className="flex gap-4 items-center justify-center">
                      {login.state !== 'idle' && (
                        <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
                      )}
                      Sign in
                    </span>
                  </Button>
                </div>
              </fieldset>
            </login.Form>
            <div className="flex items-center justify-center mt-6">
              <Link
                to="/forgot-password"
                className="text-primary underline font-medium hover:text-primary/80 underline-offset-4"
              >
                Forgot Password ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
