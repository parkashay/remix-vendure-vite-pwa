import Container from '~/components/Container';
import { Socials } from '~/components/footer/Socials';

export default function Help() {
  return (
    <Container>
      <div className="my-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">HELP</h2>
        <p>
          Help Need assistance? Our customer support team is here to help you
          with any questions or concerns. Reach out to us anytime, and we'll
          ensure you receive the support you need.
        </p>
        <Socials />
      </div>
    </Container>
  );
}
