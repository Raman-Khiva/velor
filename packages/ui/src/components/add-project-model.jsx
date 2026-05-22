"use client";
import { useAddProjectMutation } from "@/features/projects/projectsApi";
import { useGroq } from "@/hooks/groqQuery";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import testProject from "@/db/testProject";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Field, FieldGroup } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

export function AddProjectModal() {
  const [projectIdea, setProjectIdea] = useState("A project management saas");
  const [project, setProject] = useState(null);
  const [readyToAdd, setReadyToAdd] = useState(false);
  const { generate } = useGroq();
  const [addProject, { isLoading }] = useAddProjectMutation();

  const handleSubmit = async (e) => {
    console.log("entering form submit");
    console.log("Project Idea:", projectIdea);
    try {
      setReadyToAdd(false);
      setProject(null);
      let groqGeneratedProject = await generate(projectIdea);
      console.log("GROQ generated project (raw):", groqGeneratedProject);
      groqGeneratedProject = await JSON.parse(groqGeneratedProject);
      console.warn(
        "Parsed GROQ generated project type:",
        typeof groqGeneratedProject,
      );
      console.log("Parsed GROQ generated project:", groqGeneratedProject);
      if (
        groqGeneratedProject != null ||
        typeof groqGeneratedProject !== "object"
      ) {
        setReadyToAdd(true);
        setProject(groqGeneratedProject);
      } else {
        console.error(
          "groqGeneratedProject is not an object:",
          groqGeneratedProject,
        );
      }
    } catch (error) {
      setReadyToAdd(false);
      console.error("Error parsing GROQ response:", error);
    }
  };

  const handleAddProject = async () => {
    console.log("Add project button clicked");
    try {
      if (!readyToAdd || !project) {
        console.warn(
          "Project not ready to be added or project data is missing, aborting handleAddProject.",
        );
      }
      const res = await addProject(project);
      console.log("Add project response:", res);
    } catch (error) {
      console.error("Error adding project to the server:", error);
    }
    setReadyToAdd(false);
    setProject(null);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Generate Project</Button>
        </DialogTrigger>
        {readyToAdd ? (
          <DialogContent>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Project generated successfully. '\n' Ready to be added{" "}
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleAddProject}>Add project</Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Generate project</DialogTitle>
              <DialogDescription>
                Describe your project idea here to generate a executable project
                plan.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Project Idea</Label>
                <Input
                  id="name-1"
                  value={projectIdea}
                  onChange={(e) => setProjectIdea(e.target.value)}
                  name="project-idea"
                  defaultValue="A project management saas"
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </form>
    </Dialog>
  );
}
