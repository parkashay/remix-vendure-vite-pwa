import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Button from '~/components/Button';
import Container from '~/components/Container';

export default function SuccessPage() {
  return (
    <Container>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg text-center min-h-screen">
        <div className="bg-white sm:py-10 sm:px-8  py-6 px-4 rounded-lg shadow">
          <CheckCircleIcon
            className="h-12 w-12 mb-2 mx-auto text-green-500"
            aria-hidden="true"
          />
          <h3 className="text-2xl font-bold mt-4">
            {' '}
            Your account has been created successfully!
          </h3>
          <p className="mb-10 mt-3 text-sm">
            Please check your email for a confirmation link to activate your
            account.
          </p>
          <div className="mx-auto" style={{ maxWidth: 150 }}>
            <Button fullWidth to="/">
              Go home
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
