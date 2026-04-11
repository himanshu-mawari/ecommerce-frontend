import {Link} from "react-router-dom"

const EmptyCart = () => {
  
  return (
    <div className="flex flex-col items-center  py-48 xl:py-52 border-t border-gray-300">
        <div>
            
        <h1 className="text-center text-2xl md:text-3xl geist font-semibold ">Your bag is empty</h1>
        <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        </div>
        <Link to="/">
        <button className="bg-black text-white rounded-full text-md md:text-lg md:w-sm geist py-3 mt-8 font-semibold w-xs cursor-pointer">START SHOPPING</button>
        </Link>
    </div>
  )
}

export default EmptyCart