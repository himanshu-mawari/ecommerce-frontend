
const QuantitySelector = ({quantity , setQuantity}) => {
    
 
  return (
    <>
      <label className="font-semibold md:font-bold text-base  text-black ml-1">
        Quantity
      </label>
      <div className="flex items-center justify-between w-40 border mt-2 border-gray-300 rounded-lg px-4 py-3 focus-within:border-black transition-colors">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="text-2xl cursor-pointer hover:text-gray-500 transition-colors"
        >
          &minus;
        </button>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-12 text-center text-lg font-semibold bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="text-2xl cursor-pointer hover:text-gray-500 transition-colors"
        >
          +
        </button>
      </div>
    </>
  );
};

export default QuantitySelector;
