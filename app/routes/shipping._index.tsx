import Container from '~/components/Container';

export default function Shipping() {
  return (
    <Container>
      <div className="font-sans mx-auto bg-white my-12">
        {/* Shipping Section */}
        <h1 className="text-4xl font-extrabold text-center text-primary-800 mb-8">
          Shipping
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We are committed to providing a seamless shopping experience, which
          includes offering reliable and efficient shipping options.
        </p>

        {/* Shipping Information Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Shipping Information:
        </h2>
        <ul className="list-disc pl-8 space-y-4 text-lg text-gray-700">
          <li>
            <strong>Free Worldwide Delivery:</strong> Enjoy delivery on all
            orders, regardless of where you are located.
          </li>
          <li>
            <strong>Processing Time:</strong> Orders are typically processed
            within [1-2 business days]. During high-demand periods, processing
            may take longer.
          </li>
          <li>
            <strong>Shipping Time:</strong> Shipping times vary depending on
            your location. Most orders are delivered within [5-10 business days]
            after the order is processed. Please note that international
            deliveries may take longer.
          </li>
          <li>
            <strong>Tracking Your Shipment:</strong> Once your order is shipped,
            you will receive a shipping confirmation email with a tracking
            number to monitor your delivery.
          </li>
          <li>
            <strong>Shipping Restrictions:</strong> We do not ship to P.O. boxes
            or certain remote locations. If your delivery address is in a
            restricted area, we will contact you to make alternative
            arrangements.
          </li>
        </ul>
      </div>
    </Container>
  );
}
