
const OrderSuccess = () => {
  return (
    <div>
  <h1>Order Placed Successfully</h1>
  <p>Order ID: 102913320</p>
  <p>Total: ₹{total}</p>

  <button onClick={() => navigate("/")}>
    Continue Shopping
  </button>
</div>
  )
}

export default OrderSuccess