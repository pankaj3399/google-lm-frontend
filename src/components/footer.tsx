import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer
      data-layername="footer1"
      className="flex flex-col items-center  px-8 pt-20 pb-10 w-full bg-white max-md:px-5 max-md:max-w-full"
    >
      <div
        data-layername="content"
        className="flex flex-col w-full max-w-[1204px] px-8 sm:px-8 max-md:max-w-full"
      >
        <div
          data-layername="content"
          className="flex flex-col pb-28  w-full max-md:pb-24 max-md:max-w-full"
        >
          <div
            data-layername="text"
            className="max-w-full text-4xl sm:text-2xl font-bold leading-none text-center rounded-none text-blue-950 w-[134px]"
          >
            Metrics<span>LM</span>
          </div>
          <div
            data-layername="logoDivider"
            className="flex gap-5 items-center mt-4 w-full max-md:max-w-full"
          >
            <div
              data-layername="dividerInline"
              className="flex flex-col flex-1 shrink justify-center self-stretch my-auto w-full basis-0 min-h-[1px] min-w-[240px] max-md:max-w-full"
            >
              <div
                data-layername="line"
                className="w-full border border-gray-100 border-solid min-h-[1px] max-md:max-w-full"
              />
            </div>
          </div>
          <nav className="flex flex-wrap gap-8 items-start mt-4 w-full text-2xl sm:text-base max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink justify-center items-start basis-0 min-w-[160px]">
              <h3 className="gap-2 self-stretch font-bold leading-tight text-zinc-700/80 sm:text-zinc-700">
                About MetricsLM
              </h3>
              <ul className="flex flex-col justify-center items-start mt-4 font-light  tracking-wide sm:tracking-normal sm:font-medium leading-none text-center text-gray-600/80 sm:text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Company Overview
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:text-blue-500">
                    Careers
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:text-blue-500">
                    Press & Media
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:text-blue-500">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col flex-1 shrink justify-center items-start basis-0 min-w-[160px]">
              <h3 className="gap-2 self-stretch font-bold leading-tight text-zinc-700/80 sm:text-zinc-700">
                Support & Contact
              </h3>
              <ul className="flex flex-col justify-center items-start mt-4 font-light  tracking-wide sm:tracking-normal sm:font-medium leading-none text-center text-gray-600/80 sm:text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Contact Us
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:text-blue-500">
                    Technical Support
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="hover:text-blue-500">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col flex-1 shrink justify-center items-start basis-0 min-w-[160px]">
              <h3 className="gap-2 self-stretch font-bold leading-tight whitespace-nowrap text-zinc-700/80 sm:text-zinc-700">
                Connect
              </h3>
              <ul className="flex flex-col justify-center mt-4 font-light  tracking-wide sm:tracking-normal sm:font-medium leading-none text-center text-gray-600/80 sm:text-gray-600">
                <li>
                  <a
                    href="#"
                    className="flex items-center hover:text-blue-500 "
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7d1c9fc3b74ff629c274caf0f3550485b4816f39dd355deee83acee8a96832?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
                      alt="Instagram"
                      className="object-contain shrink-0 self-stretch my-auto aspect-square w-[24px] sm:w-[18px]"
                    />
                    <span className="ml-2">Facebook</span>
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="flex items-center hover:text-blue-500">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e36f99ccf47168e55bcf46d7b851c820a5394dc98541e74cd966e1bc09aa9bbb?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
                      alt="Facebook"
                      className="object-contain shrink-0 self-stretch my-auto aspect-square w-[24px] sm:w-[18px]"
                    />
                    <span className="ml-2">Instagram</span>
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="flex items-center hover:text-blue-500">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/011805291b0887b4e9d6de23a39ea5b54e66f1fe19cae5ee089acc45e9f4b2c3?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
                      alt="Twitter"
                      className="object-contain shrink-0 self-stretch my-auto aspect-square w-[24px] sm:w-[18px]"
                    />
                    <span className="ml-2">Twitter / X</span>
                  </a>
                </li>
                <li className="mt-2">
                  <a href="#" className="flex items-center hover:text-blue-500">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f5841194034cab5d6c94dca7797fb2fa261a65ac88a8751923a8622ffc72e5f?placeholderIfAbsent=true&apiKey=185142cafc424ef59bd121ce5895eb95"
                      alt="LinkedIn"
                      className="object-contain shrink-0 self-stretch my-auto aspect-square w-[24px] sm:w-[18px]"
                    />
                    <span className="ml-2">LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div
          data-layername="dividerInline"
          className="flex flex-col justify-center w-full min-h-[1px] max-md:max-w-full"
        >
          <div
            data-layername="line"
            className="w-full border border-solid border-slate-300 min-h-[1px] max-md:max-w-full"
          />
        </div>
        <div
          data-layername="footer"
          className="flex flex-wrap gap-6 justify-center items-center py-5 w-full text-sm max-md:max-w-full"
        >
          <p className="flex-1 shrink self-stretch my-auto leading-snug text-gray-500 basis-0 max-md:max-w-full">
            ©2024 MetricsLM · All rights reserved.
          </p>
          <div className="flex gap-6 justify-center items-center self-stretch my-auto font-medium leading-none text-center text-gray-600">
            <a
              href="#"
              className="hover:text-blue-500"
              onClick={() => navigate("/terms")}
            >
              Terms of use
            </a>
            <a
              href="#"
              className="hover:text-blue-500"
              onClick={() => navigate("/privacy")}
            >
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
