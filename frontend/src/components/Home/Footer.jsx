export default function Footer() {
  const socialLinks = [
    {
      href: "https://dribbble.com/",
      label: "Dribbble",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/",
      label: "LinkedIn",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      href: "https://x.com/",
      label: "Twitter / X",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      href: "https://www.youtube.com",
      label: "YouTube",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      ),
    },
  ];

  const navColumns = [
    {
      heading: "Product",
      links: ["Home", "Support", "Pricing", "Affiliate"],
    },
    {
      heading: "Resources",
      links: ["Company", "Blogs", "Community", "Careers", "About"],
      badge: { label: "We're hiring!", on: "Careers" },
    },
    {
      heading: "Legal",
      links: ["Privacy", "Terms"],
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <footer className="
        py-10 sm:py-14 md:py-16
        px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32
        text-[13px] text-gray-500
        bg-gradient-to-r from-white via-green-200/60 to-white
        mt-12 sm:mt-20 md:mt-32
      ">
        <div className="flex flex-col gap-8">

          {/* Top: Logo + Nav */}
          <div className="flex flex-wrap gap-6 sm:gap-10 md:gap-14 items-start">
            <a href="#" className="shrink-0">
              <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
            </a>

            <div className="grid grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-10 md:gap-x-14 flex-1 min-w-[240px]">
              {navColumns.map(({ heading, links, badge }) => (
                <div key={heading}>
                  <p className="text-slate-800 font-semibold">{heading}</p>
                  <ul className="mt-2 space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="/" className="hover:text-green-600 transition flex flex-wrap items-center gap-1.5">
                          {link}
                          {badge?.on === link && (
                            <span className="text-[11px] text-white bg-green-600 rounded-md px-2 py-0.5 whitespace-nowrap">
                              {badge.label}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t border-black/[0.07]" />

          {/* Bottom: tagline + socials + copyright */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p className="max-w-[260px] leading-relaxed">
              Making every customer feel valued—no matter the size of your audience.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="hover:text-green-500 transition"
                >
                  {icon}
                </a>
              ))}

              <span className="text-gray-300 mx-1">|</span>
              <p className="whitespace-nowrap">© 2025 Resume Builder</p>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}