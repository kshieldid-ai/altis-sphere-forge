import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ServiceProjects from "@/components/ServiceProjects";
import type { ServiceOffer } from "@/data/services";
import { cn } from "@/lib/utils";

type Props = {
  service: ServiceOffer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ServiceExpandCard = ({ service, open, onOpenChange }: Props) => {
  const Icon = service.icon;

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <article
        className={cn(
          "service-shell group h-full",
          open && "hover:translate-y-0",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="icon-shell">
            <Icon size={22} className="text-primary-foreground" />
          </div>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              aria-label={open ? `Masquer le détail de ${service.title}` : `Voir le détail de ${service.title}`}
              className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-background/70 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronDown
                size={18}
                className={cn("transition-transform duration-300", open && "rotate-180")}
              />
            </button>
          </CollapsibleTrigger>
        </div>

        <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{service.title}</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.desc}</p>

        <CollapsibleContent className="overflow-hidden">
          <div className="mt-6 border-t border-border/70 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{service.subtitle}</p>

            <div className={cn("mt-4 grid gap-2", service.images.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
              {service.images.map((image, index) => (
                <figure
                  key={image.src}
                  className={cn(
                    "overflow-hidden border border-border/70 bg-background/40",
                    service.images.length === 3 && index === 0 && "col-span-2",
                  )}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className={cn(
                      "h-28 w-full object-cover sm:h-32",
                      service.images.length === 3 && index === 0 && "h-36 sm:h-40",
                    )}
                  />
                </figure>
              ))}
            </div>

            <ul className="mt-5 space-y-2.5">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {service.projects ? <ServiceProjects projects={service.projects} /> : null}
          </div>
        </CollapsibleContent>
      </article>
    </Collapsible>
  );
};

export default ServiceExpandCard;
