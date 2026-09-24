import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { lifeEvents } from "@/data/lifeEvents";

const LifeEventLinks = () => {
  return (
    <TooltipProvider delayDuration={150}>
      <div
        className="fs-eyebrow text-gold-500/90 font-semibold mb-5 fade-in"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontStyle: "italic",
          letterSpacing: "0.14em",
        }}
      >
        Explore by Life Event
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 fade-in">
        {lifeEvents.map((event) => {
          const Icon = event.icon;
          return (
            <Tooltip key={event.slug}>
              <TooltipTrigger asChild>
                <Link
                  to={`/life-events/${event.slug}`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-card border border-gold-500/30 pl-2.5 pr-5 py-2 shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(0,0,0,0.45)] hover:border-gold-500"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-gold-500 flex-shrink-0 transition-colors group-hover:bg-gold-500 group-hover:text-primary">
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <span className="fs-body font-serif font-semibold text-primary whitespace-nowrap">
                    {event.label}
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                className="max-w-xs bg-navy-900 border-gold-500/40 text-white px-4 py-3"
                side="top"
              >
                <p className="text-sm leading-relaxed mb-2">{event.hoverBlurb}</p>
                <p className="text-xs font-semibold text-gold-500 uppercase tracking-wide">
                  Click to learn more
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default LifeEventLinks;
