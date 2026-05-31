import { HiOutlinePlus } from "react-icons/hi2";

const AdminProductFields = ({
  form,
  handleChange,
  handleStockChange,
  handleImage,
}) => {
  console.log(form.previews);
  return (
    <div className="inter">
      <div className=" md:grid md:grid-cols-[60%_1fr] md:gap-4 md:items-start">
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm ">
            <h2 className="text-sm inter font-semibold text-gray-900 mb-0.5">
              General Information
            </h2>
            <p className="text-xs text-gray-500 inter">
              Basic details about the product.
            </p>
            <div className="space-y-2">
              <div className="mt-3">
                <label className="text-xs  font-medium ">Product Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Slim Fit Cotton Shirt"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium ">Description</label>
                <textarea
                  placeholder="Material, fit, and care instructions..."
                  rows={5}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-semibold mb-0.5">Product Images</h2>
            <p className="text-[11px] text-gray-500 mb-4">
              Upload up to 4 images. The first image will be the cover.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((index) =>
                form.previews[index] ? (
                  <div key={index} className="aspect-square w-full relative">
                    <img
                      src={form.previews[index]}
                      alt="preview"
                      className="w-full h-full object-cover object-top rounded-xl border border-gray-200"
                    />
                    {index === 0 && (
                      <span className="absolute top-2 left-2 text-[9px] font-semibold bg-black text-white px-2 py-0.5 rounded-full">
                        Cover
                      </span>
                    )}
                  </div>
                ) : (
                  <label
                    key={index}
                    htmlFor={`file-upload-${index}`}
                    className="group flex flex-col items-center justify-center aspect-square w-full border-2 border-dashed border-gray-200 rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all cursor-pointer"
                  >
                    <HiOutlinePlus className="text-gray-400 group-hover:text-indigo-300 size-5 transition-colors" />
                    {index === 0 && (
                      <span className="text-[10px] text-gray-400 mt-1">
                        Cover
                      </span>
                    )}
                    <input
                      id={`file-upload-${index}`}
                      type="file"
                      className="hidden"
                      onChange={handleImage}
                    />
                  </label>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-semibold mb-0.5">Pricing</h2>
            <p className="text-xs text-gray-500">Set the price</p>
            <div className="mt-3">
              <label className="text-xs  text-gray-600 uppercase tracking-wider">
                Selling Price
              </label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-semibold  mb-0.5">Size Inventory</h2>
            <p className="text-xs text-gray-500 ">
              Add stock quantity available for each size
            </p>

            <div className="space-y-2 mt-4">
              {form.sizes.map((size) => (
                <div
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-xl"
                  key={size.label}
                >
                  <div className="flex items-center justify-center bg-indigo-700 text-white text-[10px] font-bold size-8 rounded-lg uppercase">
                    {size.label}
                  </div>
                  <input
                    type="number"
                    placeholder="Qty"
                    value={size.stock}
                    onChange={(e) =>
                      handleStockChange(size.label, e.target.value)
                    }
                    className="w-20 bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-right focus:outline-none focus:border-indigo-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-sm font-semibold mb-4">Organization</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium">Category</label>
                <select
                  className="w-full mt-1 bg-gray-50 border border-gray-200 text-sm rounded-xl p-3 outline-none "
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kid">Kid</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium">Sub Category</label>
                <select
                  className="w-full mt-1 bg-gray-50 border border-gray-200 text-sm rounded-xl p-3 outline-none "
                  name="subCategory"
                  value={form.subCategory}
                  onChange={handleChange}
                >
                  <option value="top">Top Wear</option>
                  <option value="bottom">Bottom Wear</option>
                  <option value="winter">Winter Wear</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductFields;
