import { Check, ChevronDown } from "lucide-react";
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
      {/* id = ancre des liens /services#… du pied de page */}
      <article id={service.id} className={cn("service-shell h-full scroll-mt-28", open && "border-primary/40")}>
        <span className="icon-shell">
          <Icon size={24} aria-hidden="true" />
        </span>

        <h2 className="mt-6 text-xl font-bold">{service.title}</h2>
        <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">{service.desc}</p>

        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            {open ? "Masquer le détail" : "Voir le détail"}
            <ChevronDown size={16} className={cn("transition-transform duration-200", open && "rotate-180")} />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          <div className="mt-6 border-t pt-6">
            <p className="text-sm font-bold">{service.subtitle}</p>

            <div className={cn("mt-4 grid gap-2", service.images.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
              {service.images.map((image, index) => {
                const isHero = service.images.length === 3 && index === 0;
                return (
                  <figure key={image.src} className={cn("overflow-hidden rounded-md", isHero && "col-span-2")}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className={cn("h-28 w-full object-cover sm:h-32", isHero && "h-40 sm:h-48")}
                    />
                  </figure>
                );
              })}
            </div>

            <ul className="mt-5 space-y-2">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
                  <Check size={16} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
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
