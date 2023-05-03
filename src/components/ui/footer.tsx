import Link from "next/link";
import Image from "next/image";
import { footerMenuList, socialIcons } from "../../data/footer_data";

const Footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}

      <footer className="dark:bg-jacarta-900 page-footer bg-white">
        <div className="container">
          <div className="grid grid-cols-6 gap-x-7 gap-y-14 pt-24 pb-12 md:grid-cols-12">
            <div className="col-span-3 md:col-span-4">
              {/* <!-- Logo --> */}
              <Link href="#" className="mb-6 inline-block">
                <img
                  src="/images/logo.png"
                  className="max-h-7 dark:hidden"
                  alt="Bad Dogs Company | NFT Marketplace"
                />
              </Link>

              <Link href="#" className=" mb-6 inline-block">
                <img
                  src="/images/logo_white.png"
                  className="hidden max-h-7 dark:block mb-6"
                  alt="Bad Dogs Company | NFT Marketplace"
                />
              </Link>
              <p className="dark:text-jacarta-300 mb-12">
                Create, sell and collect truly rare digital artworks. Powered by
                blockchain technology.
              </p>

              {/* <!-- Socials --> */}
              <div className="flex space-x-5">
                {socialIcons.map((item) => {
                  const { id, href, text } = item;
                  return (
                    <Link href={href} key={id} target="_blank"
                      rel="noopener noreferrer"
                      className="group cursor-pointer">
                      <svg className="icon group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white">
                        <use xlinkHref={`/icons.svg#icon-${text}`}></use>
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>

            {footerMenuList.map((single) => (
              <div
                className={`col-span-full sm:col-span-3 md:col-span-2 ${single.diffClass}`}
                key={single.id}
              >
                <h3 className="font-display text-jacarta-700 mb-6 text-sm dark:text-white">
                  {single.title}
                </h3>
                <ul className="dark:text-jacarta-300 flex flex-col space-y-1">
                  {single.list.map((item) => {
                    const { id, href, text } = item;
                    return (
                      <li key={id}>
                        <Link href={href} className="hover:text-accent dark:hover:text-white">
                          {text}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0">
            <span className="dark:text-jacarta-400 text-sm">
              <span>© {new Date().getFullYear()} Bad Dogs Company — All Rights Reserved.</span>
            </span>

            <ul className="dark:text-jacarta-400 flex flex-wrap space-x-4 text-sm">
              <li>
                <Link href="/tarms" className="hover:text-accent dark:hover:text-white">
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link href="/tarms" className="hover:text-accent dark:hover:text-white">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
          {/* <!-- Fixed bottom footer --> */}
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:hidden lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
