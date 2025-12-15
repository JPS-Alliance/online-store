"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate successful submit
    setSubmitted(true);

    // Optional: reset form
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="bg-[#EFF3EB] py-24">
      <div className="max-w-3xl mx-auto px-10 md:px-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-medium text-black mb-6">
          Contact Us
        </h1>
        <p className="text-black/70 mb-12 leading-relaxed">
          Have a question or need assistance? Send us a message and we’ll get
          back to you shortly.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {!submitted ? (
            /* FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-black font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="w-full rounded-lg border border-black/20 px-4 py-3 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#cfe89a] transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-black font-medium mb-2">
                  Email <span className="text-black/50">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-black/20 px-4 py-3 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#cfe89a] transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-black font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="Optional"
                  className="w-full rounded-lg border border-black/20 px-4 py-3 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#cfe89a] transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-black font-medium mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="How can we help?"
                  rows={5}
                  className="w-full rounded-lg border border-black/20 px-4 py-3 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#cfe89a] transition resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  mt-6
                  bg-black
                  text-[#ECFEA7]
                  px-6
                  py-3
                  rounded-lg
                  cursor-pointer
                  border
                  border-transparent
                  hover:border-[#cfe89a]
                  transition
                  inline-flex
                  items-center
                  justify-center
                "
              >
                Send Message
              </button>
            </form>
          ) : (
            /* SUCCESS STATE */
            <div className="text-center py-16">
              <div className="text-5xl mb-6">✓</div>
              <h2 className="text-2xl md:text-3xl font-medium text-black mb-4">
                Message sent successfully
              </h2>
              <p className="text-black/70 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. We’ll get back to you as soon as
                possible.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
