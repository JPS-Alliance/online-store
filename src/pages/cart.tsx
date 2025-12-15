"use client";

import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export default function CartPage() {
  const { cart } = useAppContext();
  const isEmpty = cart.length === 0;

  return (
    <section className="bg-[#EFF3EB] py-24">
      <div className="max-w-5xl mx-auto px-10 md:px-20">
        {isEmpty ? (
          /* EMPTY CART */
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <h1 className="text-3xl md:text-4xl font-medium text-black mb-4">
              Your cart is empty
            </h1>

            <p className="text-black/70 mb-8">
              Looks like you haven’t added anything to your cart yet.
            </p>

            <Link
              href="/collections/all"
              className="
                inline-flex
                items-center
                justify-center
                bg-black
                text-[#ECFEA7]
                px-6
                py-3
                rounded-lg
                border
                border-transparent
                hover:border-[#cfe89a]
                transition
              "
            >
              Continue shopping
            </Link>

            <p className="text-black/60 text-sm mt-10">
              Have an account?{" "}
              <Link
                href="/login"
                className="underline hover:text-black transition"
              >
                Log in
              </Link>{" "}
              to check out faster.
            </p>
          </div>
        ) : (
          /* CART WITH ITEMS */
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-3xl md:text-4xl font-medium text-black">
                Your Cart
              </h1>

              <Link
                href="/collections/all"
                className="text-black/70 hover:text-black underline transition"
              >
                Continue shopping
              </Link>
            </div>

            {/* Cart items */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-black/10 pb-4"
                >
                  <div>
                    <h3 className="font-medium text-black">{item.name}</h3>
                    <p className="text-black/60 text-sm">Qty: {item.quantity}</p>
                  </div>

                  <div className="text-black font-medium">
                    ${(item.price * item.quantity).toFixed(2)} CAD
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-end mt-8 text-black font-semibold text-lg">
              Total: $
              {cart
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}{" "}
              CAD
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              className="
                mt-6
                bg-black
                text-[#ECFEA7]
                px-6
                py-3
                rounded-lg
                font-medium
                w-full
                text-center
                cursor-pointer
                transition
                hover:bg-[#1a1a1a]
                active:bg-[#0d0d0d]
              "
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
