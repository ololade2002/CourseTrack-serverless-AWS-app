import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";
import logo from "../../assets/logo.png";
import { useAuth } from "react-oidc-context";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useAuth();

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-8 md:h-10 w-auto" src={logo} alt="CourseTrack Logo" />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6 text-forestGreen" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href}
                className="text-[16px] font-raleway hover:text-forestGreen font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden lg:flex lg:flex-1 gap-4 font-raleway lg:justify-end">
            <button
              type="button"
              onClick={() => auth.signinRedirect({ extraQueryParams: { screen_hint: "signup" } })}
              className="text-[16px] px-8 py-2 rounded-full font-semibold outline-1 border border-deepGreen hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 text-gray-900">
              Sign up
            </button>
            <button
              type="button"
              onClick={() => auth.signinRedirect()}
              className="text-[16px] px-9 py-2 rounded-full text-white bg-forestGreen hover:brightness-110 hover:shadow-lg hover:shadow-[#25a163]/30 font-semibold">
              Log in
            </button>
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <img className="h-8 w-auto" src={logo} alt="CourseTrack Logo" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6 text-forestGreen" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a key={item.name} href={item.href}
                      className="-mx-3 block rounded-lg font-raleway hover:text-deepGreen px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-softGreen"
                      onClick={() => setMobileMenuOpen(false)}>
                      {item.name}
                    </a>
                  ))}
                </div>

                {/* Mobile auth buttons */}
                <div className="py-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => auth.signinRedirect({ extraQueryParams: { screen_hint: "signup" } })}
                    className="text-[16px] px-8 py-2 rounded-full font-semibold outline-1 border border-deepGreen hover:text-forestGreen text-gray-900">
                    Sign up
                  </button>
                  <button
                    type="button"
                    onClick={() => auth.signinRedirect()}
                    className="text-[16px] px-9 py-2 rounded-full text-white bg-forestGreen hover:text-black hover:border border-2 hover:bg-white font-semibold">
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Navbar;