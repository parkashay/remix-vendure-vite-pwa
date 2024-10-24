import { DataFunctionArgs } from '@remix-run/server-runtime';

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();
}

export async function loader() {
  return null;
}
