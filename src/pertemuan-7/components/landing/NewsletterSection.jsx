import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section id="newsletter" className="py-12 bg-gradient-to-r from-[#4F7DF3] to-[#3B6AE8]">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-7">

          {/* Left: text */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-white/80 text-[11px] font-bold mb-2.5">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              NEWSLETTER WISATA
            </div>
            <h3 className="text-[22px] font-black text-white leading-tight mb-1.5">
              Dapatkan Promo Wisata Terbaru
            </h3>
            <p className="text-white/65 text-[13px]">
              Flash sale, paket eksklusif, dan tips liburan langsung ke inbox Anda.{" "}
              <span className="text-white/85 font-semibold">15.000+ subscriber.</span>
            </p>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto md:min-w-[360px]">
            {subscribed ? (
              <div className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 text-white font-semibold text-[13px]">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Terima kasih! Promo terbaru akan segera dikirim.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="email@anda.com"
                  aria-label="Alamat email untuk subscribe newsletter wisata"
                  className="flex-1 h-11 px-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-white/45 text-[13px] focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                />
                <button
                  type="submit"
                  className="h-11 px-6 rounded-xl bg-white text-[#4F7DF3] font-black text-[13px] flex items-center gap-2 hover:bg-[#F0F5FF] active:scale-95 transition-all duration-200 whitespace-nowrap flex-shrink-0"
                >
                  Subscribe
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
