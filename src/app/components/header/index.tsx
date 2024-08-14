"use client";
import { addUser } from "@/app/api/user";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const navigation = [
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const solutions = [
  {
    name: "Blog",
    description: "Learn about tips, product updates and company culture",
    href: "#",
  },
  {
    name: "Help center",
    description:
      "Get all of your questions answered in our forums of contact support",
    href: "#",
  },
  {
    name: "Guides",
    description: "Learn how to maximize our platform to get the most out of it",
    href: "#",
  },
  {
    name: "Events",
    description:
      "Check out webinars with experts and learn about our annual conference",
    href: "#",
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously",
    href: "#",
  },
];

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const { mutate } = useMutation({
    mutationFn: addUser,
  });

  React.useEffect(() => {
    if (session?.user?.name && session?.user?.email && session?.user?.image) {
      const newUser = {
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.image,
      };

      mutate(newUser);
    }
  }, [session]);

  return (
    <header className="bg-neutral-800">
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <div className="hidden lg:flex items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-slate-400 px-3 py-2 hover:bg-[#a6c5e229] rounded"
              >
                {item.name}
              </a>
            ))}
            <Popover className="relative">
              <PopoverButton className="flex items-center text-sm font-semibold leading-6 text-slate-400 px-3 py-2 hover:bg-[#a6c5e229] rounded">
                <span>Solutions</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </PopoverButton>

              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute left-1/2 z-10 mt-6 flex w-screen max-w-max -translate-x-1/2 px-4">
                  <div className="w-screen max-w-sm flex-auto rounded-3xl bg-neutral-800 p-4 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                    {solutions.map((item) => (
                      <div
                        key={item.name}
                        className="relative rounded-lg p-4 hover:bg-[#a1bdd914]"
                      >
                        <a
                          href={item.href}
                          className="font-semibold text-slate-400"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-400">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </PopoverPanel>
              </Transition>
            </Popover>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="hidden lg:flex">
          <button
            onClick={() => signIn()}
            className="text-sm font-semibold leading-6 text-slate-400"
          >
            Log in
          </button>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-neutral-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-slate-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-400 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-400 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
