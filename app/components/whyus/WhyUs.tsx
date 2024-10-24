import {
  CheckCircleIcon,
  HandThumbUpIcon,
  LockClosedIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const WhyUs = () => {
  return (
    <div className="bg-white py-16 px-8 md:px-16 lg:px-32">
      <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium text-center mb-12 text-gray-900">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <CheckCircleIcon className="text-3xl text-green-500 mb-4 w-12" />
          <h3 className="text-xl font-semibold mb-2">High-Quality Products</h3>
          <p>
            We are committed to providing only the highest quality products to
            ensure your satisfaction.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <HandThumbUpIcon className="text-5xl text-blue-500 mb-4 w-12" />
          <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
          <p>
            Your satisfaction is our top priority. We go above and beyond to
            meet your needs.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <LockClosedIcon className="text-5xl text-yellow-500 mb-4 w-12" />
          <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
          <p>
            Our payment process is secure, ensuring your personal information is
            protected.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <TruckIcon className="text-5xl text-red-500 mb-4 w-12" />
          <h3 className="text-xl font-semibold mb-2">
            Fast & Reliable Delivery
          </h3>
          <p>
            Enjoy fast and reliable delivery to your doorstep, no matter where
            you are.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
