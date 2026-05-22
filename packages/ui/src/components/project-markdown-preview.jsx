import * as React from "react";
import { Badge } from "./badge";

/**
 * Converts project JSON data into a Markdown formatted string.
 */
export function generateMarkdownFromProject(project) {
  if (!project) return "";

  let md = `# ${project.name || "Untitled Project"}\n\n`;
  if (project.description) {
    md += `${project.description}\n\n`;
  }

  md += `## Details\n\n`;
  md += `- **Type:** ${project.type || "N/A"}\n`;
  md += `- **Status:** ${project.status || "N/A"}\n`;
  md += `- **Start Date:** ${project.startDate ? new Date(project.startDate).toLocaleDateString() : "N/A"}\n`;
  md += `- **Target Date:** ${project.targetDate ? new Date(project.targetDate).toLocaleDateString() : "N/A"}\n`;
  md += `- **Owner:** ${project.owner || "N/A"}\n\n`;

  if (project.techStack && project.techStack.length > 0) {
    md += `## Tech Stack\n\n`;
    md += project.techStack.map((tech) => `- ${tech}`).join("\n") + "\n\n";
  }

  if (project.phases && project.phases.length > 0) {
    md += `## Development Phases\n\n`;

    project.phases.forEach((phase, pIdx) => {
      md += `### Phase ${phase.order || pIdx + 1}: ${phase.name} [${phase.status || "pending"} - ${phase.progress || 0}%]\n\n`;
      if (phase.description) {
        md += `${phase.description}\n\n`;
      }

      if (phase.milestones && phase.milestones.length > 0) {
        phase.milestones.forEach((milestone, mIdx) => {
          md += `#### Milestone: ${milestone.title} (${milestone.progress || 0}%)\n\n`;
          if (milestone.description) {
            md += `${milestone.description}\n\n`;
          }

          if (milestone.tasks && milestone.tasks.length > 0) {
            md += `##### Tasks\n\n`;
            milestone.tasks.forEach((task) => {
              const check = task.done ? "[x]" : "[ ]";
              md += `- ${check} **${task.title}** (${task.type || "task"})\n`;
              if (task.purpose) {
                md += `  - *Purpose*: ${task.purpose}\n`;
              }
              if (task.commands && task.commands.length > 0) {
                md += `  - *Commands*:\n`;
                md += "    ```bash\n";
                task.commands.forEach((cmd) => {
                  md += `    ${cmd}\n`;
                });
                md += "    ```\n";
              }
            });
            md += "\n";
          }
        });
      }
    });
  }

  return md;
}

/**
 * A component that displays the JSON project data in a rendered Markdown-like format.
 */
export function ProjectMarkdownPreview({ data }) {
  if (!data) return null;

  return (
    <div className="w-full text-foreground space-y-6 text-sm sm:text-base p-6 bg-card rounded-lg border border-border shadow-sm">

      <div><div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{data.name || "Untitled Project"}</h1>
        {data.description && <p className="text-muted-foreground text-lg">{data.description}</p>}
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold border-b border-border pb-1">Details</h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Type:</strong> {data.type || "N/A"}</li>
              <li><strong className="text-foreground">Status:</strong> {data.status || "N/A"}</li>
              <li><strong className="text-foreground">Start Date:</strong> {data.startDate ? new Date(data.startDate).toLocaleDateString() : "N/A"}</li>
              <li><strong className="text-foreground">Target Date:</strong> {data.targetDate ? new Date(data.targetDate).toLocaleDateString() : "N/A"}</li>
              <li><strong className="text-foreground">Owner:</strong> {data.owner || "N/A"}</li>
            </ul>
          </div>

          {data.techStack && data.techStack.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold border-b border-border pb-1">Tech Stack</h2>
              <div className="flex flex-wrap gap-2 pt-1">
                {data.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.phases && data.phases.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-border">
            <h2 className="text-2xl font-semibold tracking-tight">Development Phases</h2>

            <div className="space-y-8">
              {data.phases.map((phase, pIdx) => (
                <div key={pIdx} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-medium">
                      Phase {phase.order || pIdx + 1}: {phase.name}
                    </h3>
                    <Badge variant={phase.status === "completed" ? "default" : "outline"}>
                      {phase.status || "pending"}
                    </Badge>
                    <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">
                      {phase.progress || 0}%
                    </span>
                  </div>
                  {phase.description && <p className="text-muted-foreground">{phase.description}</p>}

                  {phase.milestones && phase.milestones.length > 0 && (
                    <div className="pl-4 sm:pl-6 space-y-6 border-l-2 border-muted">
                      {phase.milestones.map((milestone, mIdx) => (
                        <div key={mIdx} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-medium text-foreground/90">
                              Milestone: {milestone.title}
                            </h4>
                            <span className="text-xs font-mono bg-muted text-muted-foreground px-2 py-0.5 rounded">
                              {milestone.progress || 0}%
                            </span>
                          </div>
                          {milestone.description && (
                            <p className="text-muted-foreground text-sm">{milestone.description}</p>
                          )}

                          {milestone.tasks && milestone.tasks.length > 0 && (
                            <div className="space-y-2 pt-2">
                              <h5 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Tasks
                              </h5>
                              <ul className="space-y-3">
                                {milestone.tasks.map((task, tIdx) => (
                                  <li key={tIdx} className="flex items-start gap-3 bg-muted/30 p-3 rounded-md">
                                    <div className="mt-0.5">
                                      <input
                                        type="checkbox"
                                        checked={!!task.done}
                                        readOnly
                                        className="h-4 w-4 rounded border-input bg-background text-primary"
                                      />
                                    </div>
                                    <div className="space-y-1 w-full overflow-hidden">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-medium text-foreground">{task.title}</span>
                                        {task.type && (
                                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider px-1.5 py-0 h-4">
                                            {task.type}
                                          </Badge>
                                        )}
                                      </div>
                                      {task.purpose && (
                                        <p className="text-sm text-muted-foreground italic">
                                          Purpose: {task.purpose}
                                        </p>
                                      )}
                                      {task.commands && task.commands.length > 0 && (
                                        <div className="mt-2 bg-zinc-950 rounded-md border border-zinc-800 p-3 overflow-x-auto">
                                          <pre className="text-xs text-green-400 font-mono m-0">
                                            <code>{task.commands.join('\n')}</code>
                                          </pre>
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
