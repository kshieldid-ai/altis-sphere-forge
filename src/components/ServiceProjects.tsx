import { ArrowUpRight } from "lucide-react";
import type { ServiceProject } from "@/data/services";

type Props = {
  projects: ServiceProject[];
};

const ServiceProjects = ({ projects }: Props) => {
  if (!projects.length) return null;

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold">Réalisations web</p>
      <ul className="mt-3 space-y-2">
        {projects.map((project) => {
          const host = new URL(project.url).hostname.replace(/^www\./, "");
          return (
            <li key={project.url}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-md border bg-background px-4 py-3 transition-colors hover:border-primary/50"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">{project.label}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{host}</span>
                </span>
                <ArrowUpRight size={16} className="shrink-0 text-primary" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ServiceProjects;
