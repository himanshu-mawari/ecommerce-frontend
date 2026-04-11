import { useState } from "react";

const DescriptionAccordion = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer group md:w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-2xl md:text-3xl font-light tracking-wide uppercase">
          Description
        </h1>
        <h1
          className={`text-4xl font-extralight transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        > 
          +
        </h1>
      </div>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="py-5">
            <h1 className="outfit font-medium">Product details</h1>
            <p className="text-sm text-gray-600 pt-2 px-4 leading-relaxed">
              {description}
            </p>

            <div className="py-4">
              <h1 className="outfit font-medium uppercase tracking-tight">
                Little things that matter much
              </h1>

              <ol className="list-disc px-6 py-2 text-sm flex flex-col gap-3 text-gray-600">
                <li>
                  Colours may slightly vary due to photographic lighting
                  sources.
                </li>
                <li>
                  Product specifications mentioned above may vary by +/- 10%.
                </li>
                <li>
                  All products have different sizes so please refer to size
                  chart.
                </li>
                <li>Our sizes do not vary by more than +/- 0.5 inches.</li>
                <li>
                  For any returns and exchange please refer to return and
                  exchange page.
                </li>
                <li>
                  For further assistance, email <b>help.foreverbuy@gmail.com</b> or
                  Whatsapp <b>+917777019901</b>.
                </li>
                <li className="  italic text-gray-700">
                  NOTE - Normal machine wash and don't iron directly on print.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionAccordion;
