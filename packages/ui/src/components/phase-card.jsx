"use client";
import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { Progress } from "@workspace/ui/components/progress";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import { Field, FieldGroup } from "@workspace/ui/components/field";
import { Label } from "@workspace/ui/components/label";
import { Checkbox } from "@workspace/ui/components/checkbox";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export function PhaseCard({ phase, index, projectIndex }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <Card className="mx-auto bg-[#09090b] w-full max-w-5xl px-2">
        {showDetails ? (
          <>
            <CardHeader className="flex flex-col w-full">
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                  <h4 className="leading-tight">
                    <Link href={`/projects/${projectIndex}/${index}`}>
                      Phase {index + 1}: {phase.name}
                    </Link>
                  </h4>
                  <p className="text-[#a1a1a1]">{phase.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <h4 className="leading-tight">45%</h4>
                  <p className="text-[#a1a1a1]">in progress</p>
                </div>
              </div>
              <div>
                <Progress value={60} className="max-w-5xl w-full min-w-4xl" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col py-2 gap-3 text-lg">
              <h6 className="text-gray-300 text-lg">Milestones :</h6>
              <FieldGroup className="max-w-sm flex flex-col gap-2 text-lg">
                {phase.milestones.map((milestone, j) => (
                  <Field key={j} orientation="horizontal">
                    <Checkbox name="terms-checkbox" id="terms-checkbox" />
                    <Label
                      className="text-[17px] text-gray-300/80"
                      htmlFor="terms-checkbox"
                    >
                      {milestone.title}
                    </Label>
                  </Field>
                ))}
              </FieldGroup>
            </CardContent>
            <CardFooter className="flex items-center justify-between ">
              <Button className="text-white bg-blue-500">
                Phase Checkpoint
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDetails(!showDetails)}
              >
                Hide details
              </Button>
            </CardFooter>
          </>
        ) : (
          <div className="flex justify-between items-center px-3">
            <div className="flex items-center gap-4">
              <CircleCheckBig
                className="font-semibold text-blue-500"
                size={30}
              />
              <div className="flex flex-col gap-1">
                <h4>
                  Phase {index + 1}: {phase.name}
                </h4>
                <Progress value={30} className="w-xl" />
              </div>
            </div>
            <div>
              <Button
                variant="outline"
                onClick={() => setShowDetails(!showDetails)}
              >
                Show more
              </Button>
            </div>
          </div>
        )}
      </Card>
    </>
  );
}
