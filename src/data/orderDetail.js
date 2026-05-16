export const orders = [
    {
      id: "ORD-10293",
      status: "Shipped",
      placedAt: "15 May 2026, 10:42 AM",

      workflow: {
        primaryAction: "Mark as Delivered",
        secondaryAction: "Cancel Order",
      },

      timeline: [
        {
          status: "Order Placed",
          time: "15 May 2026, 10:42 AM",
        },
        {
          status: "Payment Confirmed",
          time: "15 May 2026, 10:44 AM",
        },
        {
          status: "Packed",
          time: "15 May 2026, 4:10 PM",
        },
        {
          status: "Shipped",
          time: "16 May 2026, 9:20 AM",
        },
      ],

      payment: {
        method: "UPI",
        status: "Paid",
        subtotal: 2499,
        shippingFee: 99,
        discount: 300,
        total: 2298,
      },

      items: [
        {
          id: 1,
          title: "Essential Oversized T-Shirt",
          size: "L",
          quantity: 2,
          price: 899,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        },
        {
          id: 2,
          title: "Relaxed Fit Cargo Pants",
          size: "M",
          quantity: 1,
          price: 1499,
          image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        },
      ],

      customer: {
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "+91 9876543210",
      },

      shippingAddress: {
        street: "Flat 402, Green Valley Residency",
        city: "Noida",
        state: "Uttar Pradesh",
        pincode: "201301",
        country: "India",
      },
    },

    {
      id: "ORD-10321",
      status: "Packed",
      placedAt: "14 May 2026, 7:18 PM",

      workflow: {
        primaryAction: "Mark as Shipped",
        secondaryAction: "Refund Order",
      },

      timeline: [
        {
          status: "Order Placed",
          time: "14 May 2026, 7:18 PM",
        },
        {
          status: "COD Confirmed",
          time: "14 May 2026, 7:30 PM",
        },
        {
          status: "Packed",
          time: "15 May 2026, 1:05 PM",
        },
      ],

      payment: {
        method: "Cash on Delivery",
        status: "Pending",
        subtotal: 3799,
        shippingFee: 0,
        discount: 500,
        total: 3299,
      },

      items: [
        {
          id: 1,
          title: "Urban Street Hoodie",
          size: "XL",
          quantity: 1,
          price: 1999,
          image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        },
        {
          id: 2,
          title: "Classic Straight Jeans",
          size: "34",
          quantity: 1,
          price: 1800,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        },
      ],

      customer: {
        name: "Priya Verma",
        email: "priya.verma@example.com",
        phone: "+91 9123456780",
      },

      shippingAddress: {
        street: "House No. 18B, Lake View Colony",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
        country: "India",
      },
    },
  ];