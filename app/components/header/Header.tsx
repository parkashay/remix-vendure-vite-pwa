import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';
import { useRef, useState } from 'react';
import { SearchBar } from '~/components/header/SearchBar';
import { classNames } from '~/utils/class-names';
import { useRootLoader } from '~/utils/use-root-loader';
import Drawer from '../Drawer';
import { CollectionDropdown } from './CollectionDropdown';
import { BrandsDropdown } from './BrandsDropdown';
import { MobileNav } from './MobileNav';

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const data = useRootLoader();
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function onMagnifyingGlassClick() {
    setOpenSearchBar(!openSearchBar);
  }

  function onMenuClick() {
    setOpenMenu(!openMenu);
  }

  return (
    <>
      <MobileNav
        cartQuantity={cartQuantity}
        onCartIconClick={onCartIconClick}
      />
      <header
        className={classNames(
          'sticky top-0 animate-dropIn',
          'transform bg-white z-40 relative',
        )}
      >
        <div
          className="shadow-sm relative bg-white"
          style={{
            zIndex: 1000,
          }}
        >
          <div className="max-w-8xl mx-auto p-4 flex items-center space-x-4 justify-between">
            <section>
              <Link
                prefetch="intent"
                to="/"
                aria-label="logo"
                className="flex items-center justify-center space-x-2 relative"
              >
                <img
                  src="/purpleface.png"
                  alt="Hyperce Logo"
                  className="relative h-16 w-16"
                />
              </Link>
            </section>

            <CollectionDropdown collections={data?.collections} />
            <BrandsDropdown collections={data?.brands} />
            <div
              className="bg-[#BABEC3] h-6 lg:block hidden"
              ref={ref}
              style={{
                width: '1px',
              }}
            ></div>

            <section className="flex-1 md:pr-8 lg:block hidden">
              <SearchBar></SearchBar>
            </section>

            <section className="flex items-center space-x-4">
              <div className="lg:hidden">
                <button
                  className="relative w-8 h-8 bg-opacity-20 rounded p-1"
                  onClick={onMagnifyingGlassClick}
                  aria-label="Open cart tray"
                >
                  <MagnifyingGlassIcon />
                </button>
              </div>
              <div className="hidden lg:block">
                <button
                  className="relative w-8 h-8 bg-opacity-20 rounded  p-1"
                  onClick={onCartIconClick}
                  aria-label="Open cart tray"
                >
                  <ShoppingBagIcon></ShoppingBagIcon>
                  {cartQuantity ? (
                    <div className="absolute rounded-full -top-0 -right-0  w-4 h-4 flex justify-center items-center bg-primary text-white text-xs">
                      {cartQuantity}
                    </div>
                  ) : (
                    ''
                  )}
                </button>
              </div>
              <div
                className="bg-[#BABEC3] h-6 sm:block hidden"
                style={{
                  width: '1px',
                }}
              ></div>
              {isSignedIn ? (
                <Link
                  prefetch="intent"
                  to={'/account'}
                  className="flex space-x-1"
                >
                  <UserIcon className="w-7 h-7" />
                </Link>
              ) : (
                <div className="space-x-4 hidden sm:block">
                  <Link
                    to="/sign-in"
                    prefetch="intent"
                    className="text-sm leading-none hover:underline active:underline"
                  >
                    <span>Sign in</span>
                  </Link>
                  <Link
                    to="/sign-up"
                    prefetch="intent"
                    className="text-sm leading-none hover:underline active:underline"
                  >
                    <span>Sign up</span>
                  </Link>
                </div>
              )}
              <div
                className="relative flex max-h-10 items-center md:hidden"
                onClick={onMenuClick}
              >
                <label
                  role="button"
                  aria-label="humburger"
                  id="hamburger"
                  className="relative"
                >
                  <div
                    aria-hidden="true"
                    id="line"
                    className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300"
                  ></div>
                </label>
              </div>
            </section>
          </div>
        </div>

        <section
          className="lg:hidden absolute inset-x-0 transition-all px-4 pb-4 bg-white"
          style={{
            top: openSearchBar ? '100%' : 0,
            zIndex: openSearchBar ? 30 : -1,
          }}
        >
          <SearchBar
            onSubmit={(e) => {
              setOpenSearchBar(false);
            }}
          ></SearchBar>
        </section>
      </header>

      <Drawer isOpen={openMenu} setIsOpen={setOpenMenu}>
        <div>
          {isSignedIn ? (
            <Link
              prefetch="intent"
              to={'/account'}
              onClick={(e) => {
                setOpenMenu(false);
              }}
              className="flex space-x-1 items-center hover:bg-primary-50  px-2 py-2"
            >
              <UserIcon className="w-7 h-7" />
              <span>Account</span>
            </Link>
          ) : (
            <div className="flex flex-col gap-3 md:hidden">
              <Link
                to="/sign-in"
                prefetch="intent"
                onClick={(e) => {
                  setOpenMenu(false);
                }}
                className="text-sm leading-none hover:underline active:underline hover:bg-primary-50 px-2 py-2"
              >
                <span>Sign in</span>
              </Link>
              <Link
                to="/sign-up"
                prefetch="intent"
                onClick={(e) => {
                  setOpenMenu(false);
                }}
                className="text-sm leading-none hover:underline active:underline hover:bg-primary-50 px-2 py-2"
              >
                <span>Sign up</span>
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}
