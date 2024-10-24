import Container from '~/components/Container';
import { Socials } from '~/components/footer/Socials';
import { COMPANY_EMAIL } from '~/constants';

export default function TrackOrder() {
  return (
    <Container>
      <div className="font-sans mx-auto bg-white my-12">
        {/* Track Order Section */}
        <h1 className="text-4xl font-extrabold text-center text-primary-800 mb-8">
          Track Order
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We understand how exciting it is to receive your order, and we want to
          make tracking your order as easy as possible!
        </p>

        {/* How to Track Your Order Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          How to Track Your Order:
        </h2>
        <ul className="list-disc pl-8 space-y-4 text-lg text-gray-700">
          <li>
            <strong>Order Confirmation:</strong> Once your order is placed, you
            will receive an order confirmation email with your order details.
          </li>
          <li>
            <strong>Shipping Confirmation:</strong> When your order is shipped,
            we will send you a shipping confirmation email with a tracking
            number and a link to track your package.
          </li>
          <li>
            <strong>Track Your Order:</strong> Click the tracking link in your
            shipping confirmation email or enter your tracking number on our
            website’s Track Order page to see the latest updates on your
            package's delivery status.
          </li>
        </ul>

        <p className="text-lg text-gray-700 mt-10 mb-6">
          If you have any issues tracking your order or need further assistance,
          please contact our customer service team at {COMPANY_EMAIL}.
        </p>
        <Socials />
      </div>
    </Container>
  );
}
