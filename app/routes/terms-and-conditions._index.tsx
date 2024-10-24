import React from 'react';
import Container from '~/components/Container';
import { COMPANY_EMAIL } from '~/constants';

const TermsAndConditions = () => {
  return (
    <Container>
      <div className="font-sans mx-auto my-12">
        <h1 className="text-4xl font-extrabold text-center text-primary-700 mb-8">
          Terms and Conditions
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to our website! By accessing or using our site, you agree to
          comply with and be bound by the following terms and conditions. Please
          read them carefully before using our website.
        </p>
        <ol className="list-disc pl-8 space-y-6 text-lg text-gray-700">
          <li>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Use of the Website
            </h2>
            <p>
              You agree to use this website for lawful purposes only and in a
              manner that does not infringe the rights of or restrict or inhibit
              anyone else's use and enjoyment of the website. You must not use
              this website to transmit or distribute any material that is
              unlawful, harmful, threatening, defamatory, obscene, infringing,
              harassing, or otherwise objectionable.
            </p>
          </li>
          <li>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Product Information
            </h2>
            <p>
              We strive to ensure that the information on this website is
              accurate and complete. However, we do not guarantee the accuracy,
              completeness, or reliability of any product descriptions, pricing,
              availability, or other information on this site. All products are
              subject to availability, and we reserve the right to limit the
              quantity of any products we supply.
            </p>
          </li>
          <li>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Pricing and Payment
            </h2>
            <p>
              All prices displayed on our website are in NPR and are inclusive
              of applicable taxes unless stated otherwise. We reserve the right
              to change prices without prior notice. Payment must be made
              through the payment methods provided on the website. Your payment
              information will be securely processed to ensure the protection of
              your personal information.
            </p>
          </li>
          <li>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Shipping and Delivery
            </h2>
            <p>
              We offer worldwide delivery on all orders. Shipping times may vary
              depending on the destination. While we strive to deliver your
              order within the estimated timeframe, we are not responsible for
              any delays caused by unforeseen circumstances or factors beyond
              our control.
            </p>
          </li>
          <li>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Returns and Refunds
            </h2>
            <p>
              Please refer to our Return & Refund Policy below for detailed
              information regarding returns and refunds.
            </p>
          </li>
          <li>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for
              any direct, indirect, incidental, special, or consequential
              damages arising out of or in connection with the use or inability
              to use our website or products. This includes, but is not limited
              to, damages for loss of profits, goodwill, use, data, or other
              intangible losses.
            </p>
          </li>
          <li>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed per the
              laws of Nepal. Any disputes arising out of or relating to these
              terms and conditions shall be subject to the exclusive
              jurisdiction of the courts of Nepal.
            </p>
          </li>
          <li>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Changes to Terms and Conditions
            </h2>
            <p>
              We reserve the right to modify these terms and conditions at any
              time without prior notice. Your continued use of the website
              following any such changes constitutes your acceptance of the new
              terms.
            </p>
          </li>
          <li>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Contact Us
            </h2>
            <p>
              If you have any questions or concerns about these terms and
              conditions, please contact us at {COMPANY_EMAIL}
            </p>
          </li>
        </ol>
      </div>
    </Container>
  );
};

export default TermsAndConditions;
