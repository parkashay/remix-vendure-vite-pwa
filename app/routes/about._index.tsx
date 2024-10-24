import Container from '~/components/Container';
import { Socials } from '~/components/footer/Socials';

export default function About() {
  return (
    <Container>
      <div className="font-sans mx-auto bg-white my-12">
        {/* About Us Section */}
        <h1 className="text-4xl font-extrabold text-center text-primary-800 mb-8">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to our online store, where beauty meets convenience. We are
          dedicated to providing you with the finest cosmetic products that
          enhance your natural beauty. Our mission is to offer diverse,
          high-quality products to cater to all your beauty needs. With a
          commitment to customer satisfaction, we strive to provide an
          exceptional shopping experience every time you visit.
        </p>

        {/* Services Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Services</h2>
        <ul className="list-disc pl-8 space-y-4 text-lg text-gray-700">
          <li>
            <strong>Exclusive Offers:</strong> Grab up to 50% off on selected
            clothes from our exclusive collection. Don’t miss out on these
            limited-time offers!
          </li>
          <li>
            <strong>Secure Payment Options:</strong> We prioritize your
            security. Our secure payment options ensure that your transactions
            are protected, and your personal information is safe.
          </li>
          <li>
            <strong>Free Worldwide Delivery:</strong> Enjoy free delivery on all
            orders, regardless of where you are located. We aim to make your
            shopping experience as seamless as possible.
          </li>
          <li>
            <strong>Quality Products:</strong> We use only the finest materials
            to ensure they are long-lasting and of the highest quality.
          </li>
          <li>
            <strong>Gift Services:</strong> Want to surprise someone special?
            Our site makes it easy to send a gift to your loved ones with just a
            few clicks.
          </li>
        </ul>

        {/* Help Section */}
        <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">Help</h2>
        <p className="text-lg text-gray-700 mb-6">
          Need assistance? Our customer support team is here to help you with
          any questions or concerns. Reach out to us anytime, and we'll ensure
          you receive the support you need.
        </p>

        {/* Shipping & Returns Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Shipping & Returns
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          We offer fast and reliable delivery to your doorstep, no matter where
          you are. If you are not satisfied with your purchase, we provide a
          straightforward return process to make it easy for you to get a refund
          or exchange.
        </p>

        {/* Why Choose Us Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Why Choose Us?
        </h2>
        <ul className="list-disc pl-8 space-y-4 text-lg text-gray-700">
          <li>
            <strong>High-Quality Products:</strong> We are committed to
            providing only the highest quality products to ensure your
            satisfaction.
          </li>
          <li>
            <strong>Customer Satisfaction:</strong> Your satisfaction is our top
            priority. We go above and beyond to meet your needs.
          </li>
          <li>
            <strong>Secure Transactions:</strong> Our payment process is secure,
            ensuring your personal information is protected.
          </li>
          <li>
            <strong>Fast & Reliable Delivery:</strong> Enjoy fast and reliable
            delivery to your doorstep, no matter where you are.
          </li>
        </ul>

        {/* Contact Us Section */}
        <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">
          Contact With Us
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Stay connected with us on social media! Follow us for the latest
          updates, exclusive offers, and beauty tips.
        </p>
        <Socials />
      </div>
    </Container>
  );
}
