import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import LifeEventLinks from "./LifeEventLinks";

const Hero = () => {
  return (
    <section className="relative flex items-start justify-center overflow-hidden">
      {/* Background photo (responsive AVIF/WebP, above the fold: eager, high priority) under a navy overlay */}
      <picture aria-hidden="true">
        <source type="image/avif" srcSet="/images/hero-640.avif 640w, /images/hero-1024.avif 1024w" sizes="100vw" />
        <source type="image/webp" srcSet="/images/hero-640.webp 640w, /images/hero-1024.webp 1024w" sizes="100vw" />
        <img
          src="/images/hero-1024.webp"
          alt=""
          width={1024}
          height={1536}
          loading="eager"
          decoding="async"
          {...{ fetchpriority: "high" }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0" style={{ background: "hsl(var(--navy-primary) / 0.88)" }} aria-hidden="true" />
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-10 md:pt-14 pb-10">
        <div className="max-w-4xl mx-auto">
          <h1
            className="font-serif font-bold text-white mb-2 fade-in drop-shadow-lg"
            style={{ fontSize: "clamp(1.6rem, 0.95rem + 3vw, 3.2rem)" }}
          >
            Investment Advice for Life's
            <br />
            <span className="text-gold-500">Biggest Transitions</span>
          </h1>

          <hr className="hairline-gold" />

          <p className="fs-body-lg font-serif-italic text-white fade-in max-w-3xl mx-auto drop-shadow-lg mt-6">
            From retirement and portfolio strategy to cross-border planning and Aliya: we help you make confident financial decisions at every stage of life
          </p>

          <div className="mt-8 fade-in">
            <Link
              to="/contact"
              className="inline-flex flex-col items-center gap-1 bg-gold-500 text-primary px-9 py-4 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-gold-600 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-all duration-200"
            >
              <span className="inline-flex items-center gap-3 font-serif font-bold text-lg">
                <Calendar size={22} />
                Request a free consultation
              </span>
              <span className="text-sm font-medium">
                No products. No pressure. Ask us anything.
              </span>
            </Link>
          </div>

          <div className="mt-10">
            <LifeEventLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
