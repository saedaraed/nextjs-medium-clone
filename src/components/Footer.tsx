const Footer:React.FC =()=>{
    return(
        <footer className="bg-[#f0e7c2] border-t border-[#687451]/20 py-12">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-[#3b0014] mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Solutions", "Enterprise"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-[ #687451] hover:text-[#3b0014] transition-colors cursor-pointer"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#3b0014] mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Careers", "Blog", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-[ #687451] hover:text-[#3b0014] transition-colors cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#3b0014] mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Documentation", "Help Center", "API", "Status"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-[ #687451] hover:text-[#3b0014] transition-colors cursor-pointer"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#3b0014] mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Privacy", "Terms", "Security", "Compliance"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-[ #687451] hover:text-[#3b0014] transition-colors cursor-pointer"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#687451]/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#687451] mb-4 md:mb-0">
              &copy; 2025 Company Name. All rights reserved.
            </p>
            <div className="flex space-x-6">
  <a href="#" className="text-[#687451] hover:text-[#3b0014] transition-colors cursor-pointer" aria-label="Facebook">
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.94 3.61 9.04 8.31 9.88v-6.99H7.9v-2.89h2.41V9.41c0-2.4 1.42-3.73 3.6-3.73 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.63l-.42 2.89h-2.21v6.99C18.39 21.11 22 17.01 22 12.07z" />
    </svg>
  </a>
  <a href="#" className="text-[#687451] hover:text-[#3b0014] transition-colors cursor-pointer" aria-label="Twitter">
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9.15 9.15 0 01-2.83 1.08A4.52 4.52 0 0016.11 0c-2.4 0-4.37 2.06-4.37 4.6 0 .36.04.71.12 1.04C7.69 5.5 4.07 3.67 1.64.86a4.6 4.6 0 00-.59 2.3c0 1.59.79 2.99 2 3.81A4.48 4.48 0 01.96 6v.06c0 2.22 1.51 4.07 3.52 4.49a4.5 4.5 0 01-2 .08c.56 1.87 2.18 3.23 4.1 3.27A9.06 9.06 0 010 19.55a12.8 12.8 0 006.92 2.06c8.3 0 12.84-7.24 12.84-13.52 0-.21 0-.42-.02-.63A9.3 9.3 0 0023 3z" />
    </svg>
  </a>
  <a href="#" className="text-[#687451] hover:text-[#3b0014] transition-colors cursor-pointer" aria-label="LinkedIn">
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M19 0h-14C2.239 0 1 1.239 1 2.8v18.4C1 22.761 2.239 24 4 24h14c1.761 0 3-1.239 3-2.8V2.8C22 1.239 20.761 0 19 0zm-11 20H5v-9h3v9zm-1.5-10.3c-.966 0-1.75-.79-1.75-1.75S5.534 6.2 6.5 6.2c.965 0 1.75.79 1.75 1.75S7.465 9.7 6.5 9.7zm13.5 10.3h-3v-4.9c0-1.16-.021-2.66-1.62-2.66-1.62 0-1.87 1.26-1.87 2.57v5h-3v-9h2.88v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58v4.73z" />
    </svg>
  </a>
  <a href="#" className="text-[#687451] hover:text-[#3b0014] transition-colors cursor-pointer" aria-label="Instagram">
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.16c3.2 0 3.584.012 4.849.07 1.17.055 1.97.24 2.43.407a4.92 4.92 0 011.757 1.007 4.92 4.92 0 011.007 1.757c.167.46.352 1.26.407 2.43.058 1.265.07 1.648.07 4.849s-.012 3.584-.07 4.849c-.055 1.17-.24 1.97-.407 2.43a4.92 4.92 0 01-1.007 1.757 4.92 4.92 0 01-1.757 1.007c-.46.167-1.26.352-2.43.407-1.265.058-1.648.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.055-1.97-.24-2.43-.407a4.92 4.92 0 01-1.757-1.007 4.92 4.92 0 01-1.007-1.757c-.167-.46-.352-1.26-.407-2.43C2.172 15.584 2.16 15.2 2.16 12s.012-3.584.07-4.849c.055-1.17.24-1.97.407-2.43A4.92 4.92 0 013.644 2.96a4.92 4.92 0 011.757-1.007c.46-.167 1.26-.352 2.43-.407C8.416 2.172 8.8 2.16 12 2.16zm0 1.68c-3.158 0-3.522.012-4.762.069-1.02.047-1.577.215-1.942.36a3.251 3.251 0 00-1.187.774 3.251 3.251 0 00-.774 1.187c-.145.365-.313.922-.36 1.942-.057 1.24-.069 1.604-.069 4.762s.012 3.522.069 4.762c.047 1.02.215 1.577.36 1.942.173.439.426.843.774 1.187.344.348.748.6 1.187.774.365.145.922.313 1.942.36 1.24.057 1.604.069 4.762.069s3.522-.012 4.762-.069c1.02-.047 1.577-.215 1.942-.36a3.251 3.251 0 001.187-.774 3.251 3.251 0 00.774-1.187c.145-.365.313-.922.36-1.942.057-1.24.069-1.604.069-4.762s-.012-3.522-.069-4.762c-.047-1.02-.215-1.577-.36-1.942a3.251 3.251 0 00-.774-1.187 3.251 3.251 0 00-1.187-.774c-.365-.145-.922-.313-1.942-.36-1.24-.057-1.604-.069-4.762-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.17a4.008 4.008 0 110-8.016 4.008 4.008 0 010 8.016zm6.406-11.436a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
    </svg>
  </a>
</div>

          </div>
        </div>
      </footer>
    )
}
export default Footer;