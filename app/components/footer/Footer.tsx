import { Link } from '@remix-run/react';
import { RootLoaderData } from '~/root';
import { Socials } from './Socials';

const navigation = {
  support: [
    { name: 'Help', href: '/help' },
    { name: 'Track order', href: '/track-order' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/return' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Terms and Conditions', href: '/terms-and-conditions' },
  ],
};

export default function Footer({
  collections,
}: {
  collections: RootLoaderData['collections'];
}) {
  return (
    <footer className="mt-24  bg-gray-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 ">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          <section className="col-span-2 md:col-span-3 xl:col-span-1">
            <Link
              to="/"
              prefetch="intent"
              aria-label="logo"
              className="flex items-center space-x-2  "
            >
              <img
                src="/purpleface.png"
                alt="Hyperce Logo"
                className="h-8 w-8 bg-transparent"
              />
              <h3 className="text-xl lg:text-2xl font-black ml-1 ">
                Purplleface
              </h3>
            </Link>
            <h4 className="text-sm text-gray-600 mt-4">
              Welcome to our store, where we offer high-quality cosmetics to
              enhance your natural beauty. We aim to meet all your beauty needs
              while ensuring a great shopping experience.
            </h4>
            <Socials />
          </section>

          <section className="mt-12 md:mt-0">
            <h3 className="text-sm font-semibold text-black tracking-wider uppercase">
              Shop
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {collections.map((collection) => (
                <li key={collection.id}>
                  <Link
                    className="text-base text-gray-700 hover:text-gray-900"
                    to={'/collections/' + collection.slug}
                    prefetch="intent"
                    key={collection.id}
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 md:mt-0">
            <h3 className="text-sm font-semibold text-black tracking-wider uppercase">
              Support
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-base text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-black tracking-wider uppercase">
              Company
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-base text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="mt-12 text-center ">
          <span className="text-sm tracking-wide text-gray-600 ">
            © Purplleface {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
