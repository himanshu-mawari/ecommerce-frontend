
const EmptyAddress = () => {
  return (
 <div className="w-full lg:col-span-1 mt-4 lg:mt-0">
  <div className="text-center py-8 lg:py-12 px-4  lg:border lg:border-dashed border-gray-200 lg:rounded-xl space-y-2 bg-gray-50/50">
    <p className="text-gray-700 font-semibold text-base md:text-lg">
      No saved addresses found
    </p>
    <p className="text-gray-500 text-sm max-w-sm mx-auto">
      Please add a delivery address above to proceed with your order checkout.
    </p>
  </div>
</div>
  );
};

export default EmptyAddress;
