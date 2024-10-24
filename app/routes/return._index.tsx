import Container from '~/components/Container';
import { Socials } from '~/components/footer/Socials';
import { COMPANY_EMAIL } from '~/constants';

export default function ReturnPolicy() {
  return (
    <Container>
      <div className="font-sans mx-auto bg-white my-12">
        {/* Return & Refund Policy Section */}
        <h1 className="text-4xl font-extrabold text-center text-primary-800 mb-8">
          Return & Refund Policy
        </h1>
        <ol className="list-decimal pl-8 space-y-6 text-lg text-gray-700 [&>strong]:text-primary-800">
          <li>
            <strong>Return Eligibility:</strong> We want you to be completely
            satisfied with your purchase. If you are not satisfied with a
            product, you may return it within 1 week of receipt, provided the
            item is unused, unopened, and in its original packaging.
          </li>
          <li>
            <strong>Return Process:</strong> To initiate a return, please
            contact our customer service team at {COMPANY_EMAIL} with your order
            number and reason for return. We will provide you with instructions
            on how to return your item(s).
          </li>
          <li>
            <strong>Refunds:</strong> Once we receive your returned item(s) and
            inspect them to ensure they are in their original condition, we will
            process your refund. Refunds will be credited to the original
            payment method used for the purchase within 7-8 days. Please note
            that shipping fees are non-refundable unless the return is due to
            our error or a defective product.
          </li>
          <li>
            <strong>Exchanges:</strong> If you wish to exchange a product for a
            different item, please follow the return process above and place a
            new order for the desired product. Exchanges are subject to product
            availability.
          </li>
          <li>
            <strong>Non-Returnable Items:</strong> Certain items are
            non-returnable, including but not limited to:
            <ul className="list-disc pl-8 mt-2 space-y-2">
              <li>Gift cards</li>
              <li>Sale items (unless defective)</li>
              <li>Personal care products (if opened)</li>
            </ul>
          </li>
          <li>
            <strong>Damaged or Defective Items:</strong> If you receive a
            damaged or defective item, please contact us immediately at{' '}
            {COMPANY_EMAIL} with details and a photo of the damage or defect. We
            will arrange for a replacement or refund as appropriate.
          </li>
          <li>
            <strong>Return Shipping Costs:</strong> Customers are responsible
            for the return shipping costs unless the return is due to our error
            (e.g., incorrect or defective item received). We recommend using a
            trackable shipping service or purchasing shipping insurance for
            items of significant value.
          </li>
          <li>
            <strong>Changes to Return & Refund Policy:</strong> We reserve the
            right to modify this Return & Refund Policy at any time without
            prior notice. Your continued use of the website following any
            changes constitutes your acceptance of the new policy.
          </li>
          <li>
            <strong>Contact Us:</strong> For any questions or concerns regarding
            our Return & Refund Policy, please contact us at {COMPANY_EMAIL}.
          </li>
        </ol>
        <Socials />
      </div>
    </Container>
  );
}
