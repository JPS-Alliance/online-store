"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/AppContext";
import {
  PaymentInputsContainer,
  usePaymentInputs,
} from "react-payment-inputs";
import images from "react-payment-inputs/images";

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postal: string;
  shipping: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
};

export default function CheckoutPage() {
  const { cart, clearCart } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);

  const { register, handleSubmit, watch, formState, setValue, getValues } = useForm<CheckoutFormData>({
    mode: "onChange",
  });
  const { errors, isValid } = formState;

  const shippingValue = watch("shipping");

  const payment = usePaymentInputs();

  useEffect(() => {
    if (shippingValue === "express") setShippingCost(5);
    else setShippingCost(0);
  }, [shippingValue]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const onSubmit = (data: CheckoutFormData) => {
    setLoading(true);
    setError(false);

    // Simulate payment processing (1 minute)
    setTimeout(() => {
      setLoading(false);
      setError(true); // Always fail for now
    }, 6000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center bg-[#EFF3EB] p-20">
        <h1 className="text-4xl font-semibold text-black mb-4">
          Payment Successful!
        </h1>
        <p className="text-black/70 mb-8 text-center">
          Thank you for your order. Your payment has been processed.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-[#FFEDED] p-20">
        <h1 className="text-4xl font-semibold text-red-600 mb-4">
          Payment Failed!
        </h1>
        <p className="text-red-600 mb-8 text-center">
          There was an error processing your payment. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#EFF3EB] flex flex-col items-center justify-center pb-20 pt-10">
      <h1 className="text-3xl font-medium mb-8 text-black">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl px-4"
      >
        {/* LEFT SIDE */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-xl font-semibold text-black mb-4">Shipping Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("firstName", { required: "First name is required" })}
              placeholder="First Name"
              className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
                errors.firstName ? "border-red-500" : "border-black/20"
              }`}
            />
            <input
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Last Name"
              className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
                errors.lastName ? "border-red-500" : "border-black/20"
              }`}
            />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            placeholder="Email"
            className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
              errors.email ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
              errors.address ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              {...register("city", { required: "City is required" })}
              placeholder="City"
              className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
                errors.city ? "border-red-500" : "border-black/20"
              }`}
            />
            <input
              {...register("province", { required: "Province/State is required" })}
              placeholder="Province/State"
              className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
                errors.province ? "border-red-500" : "border-black/20"
              }`}
            />
            <select
              {...register("country", { required: "Country is required" })}
              className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
                errors.country ? "border-red-500" : "border-black/20"
              }`}
            >
              <option value="">Select Country</option>
              <option value="Canada">Canada</option>
              <option value="USA">USA</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}

          <input
            {...register("postal", { required: "Postal code is required" })}
            placeholder="Postal Code"
            className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
              errors.postal ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.postal && <p className="text-red-500 text-sm">{errors.postal.message}</p>}

          <select
            {...register("shipping", { required: "Shipping method is required" })}
            className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
              errors.shipping ? "border-red-500" : "border-black/20"
            }`}
          >
            <option value="">Select Shipping Method</option>
            <option value="standard">Standard - $0.00</option>
            <option value="express">Express - $5.00</option>
          </select>
          {errors.shipping && <p className="text-red-500 text-sm">{errors.shipping.message}</p>}

          {/* Payment */}
          <h2 className="text-xl font-semibold text-black mb-4 mt-6">Payment Details</h2>

          <input
            {...register("cardName", { required: "Name on card is required" })}
            placeholder="Name on Card"
            className={`w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition ${
              errors.cardName ? "border-red-500" : "border-black/20"
            }`}
          />
          {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName.message}</p>}

          <PaymentInputsContainer
            images={images}
            {...payment}
          >
            {({ getCardNumberProps, getExpiryDateProps, getCVCProps }: any) => (
              <div className="space-y-4">
                <input
                  {...getCardNumberProps({ required: true })}
                  placeholder="Card Number"
                  className="w-full border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition"
                />
                <div className="flex gap-4">
                  <input
                    {...getExpiryDateProps({ required: true })}
                    placeholder="MM/YY"
                    className="flex-1 border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition"
                  />
                  <input
                    {...getCVCProps({ required: true })}
                    placeholder="CVC"
                    className="flex-1 border rounded-lg px-4 py-3 text-black outline-none focus:border-black transition"
                  />
                </div>
              </div>
            )}
          </PaymentInputsContainer>

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full bg-black text-[#ECFEA7] py-3 rounded-lg font-medium transition cursor-pointer ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:border-[#cfe89a] border border-transparent hover:outline hover:outline-2 hover:outline-[#cfe89a]"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loader border-t-2 border-b-2 border-white w-5 h-5 rounded-full animate-spin"></span>
                Processing...
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-black mb-4">Order Summary</h2>
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="text-black font-medium">{item.name}</p>
                    <p className="text-black/60 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-black font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-black/10 pt-4 space-y-2">
            <div className="flex justify-between text-black font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-black/60">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-black font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
