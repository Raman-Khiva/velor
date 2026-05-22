"use client";
import { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import {
  CircleCheckBig,
  ChevronsUp,
  Code,
  Flag,
  TriangleAlert,
  Pin,
} from "lucide-react";

function Overview({ task }) {
  return (
    <section className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <h6 className="text-sm">Purpose:</h6>
        <p>
          {task.purpose ||
            "Implement authentication middleware for API routes."}
        </p>
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div className="flex justify-between border-b-2 px-1 pb-1 items-end">
          <h6>Type</h6>
          <div className="flex items-center gap-2">
            <Code size={16} className="text-violet-600 font-bold" />
            <p className="font-medium">{task.type || "Dev"}</p>
          </div>
        </div>
        <div className="flex justify-between items-end border-b-2 px-1 pb-1 ">
          <h6>Priority</h6>
          <div className="flex items-center gap-2">
            <ChevronsUp size={18} className="text-green-500 font-bold" />
            <p className="font-medium">High</p>
          </div>
        </div>
        <div className="flex justify-between pb-1 px-1 items-end ">
          <h6>Dependencies</h6>
          <div className="flex items-center gap-2">
            <p className="underline dotted">#TSK-04r</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function ExeHistory() {
  return (
    <ol class="relative border-s border-default">
      <li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-buffer"></div>
        <time class="text-sm font-normal leading-none text-body">
          February 2022
        </time>
        <h5 class="text-lg font-medium text-heading my-1">
          Application UI code in Tailwind CSS
        </h5>
        <p class="mb-4 text-zinc-200 font-normal text-body">
          Get access to over 20+ pages including a dashboard layout, charts,
          kanban board, calendar, and pre-order E-commerce & Marketing pages.
        </p>
        <a
          href="#"
          class="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Learn more
          <svg
            class="w-4 h-4 ms-1.5 -me-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </a>
      </li>
      <li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-buffer"></div>
        <time class="text-sm font-normal leading-none text-body">
          March 2022
        </time>
        <h3 class="text-lg font-semibold text-heading my-2">
          Marketing UI design in Figma
        </h3>
        <p class="text-base font-normal text-body">
          All of the pages and components are first designed in Figma and we
          keep a parity between the two versions even as we update the project.
        </p>
      </li>
      <li class="ms-4">
        <div class="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-buffer"></div>
        <time class="mb-1 text-sm font-normal leading-none text-body">
          April 2022
        </time>
        <h3 class="text-lg font-semibold text-heading my-2">
          E-Commerce UI code in Tailwind CSS
        </h3>
        <p class="text-base font-normal text-body">
          Get started with dozens of web components and interactive elements
          built on top of Tailwind CSS.
        </p>
      </li>
    </ol>
  );
}

function Notes() {
  return (
    <main className="flex flex-col gap-6">
      <header className="border-border border-1 w-full rounded-sm bg-card-secondary px-5 py-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Pin size={14} className="font-normal text-text-secondary" />{" "}
          <h6 className="font-medium">Pinned notes</h6>
        </div>
        <div>
          <p className="text-zinc-100">
            Ensure we are using the new App Router structure rather than the old
            Pages router. Need dynamic routes for project detail pages.
          </p>
        </div>
      </header>
      <div>
        <p>
          Ensure we are using the new App Router structure rather than the old
          Pages router. Need dynamic routes for project detail pages.
        </p>
      </div>
    </main>
  );
}

function CollapsedTask({ setOpenTask, className }) {
  return (
    <main
      className="flex items-center gap-6 cursor-pointer not-last:border-b-2 border-border px-5 py-4"
      onClick={() => setOpenTask(true)}
    >
      <div className="w-4 h-4 rounded-full border-1 border-border" />
      <h6 className="leading-tight pt-1">#TSK-4f2</h6>
      <h5 className="font-medium text-zinc-100">Create Database Schema</h5>
    </main>
  );
}

export function Task({ task }) {
  const [selectedTitle, setSelectedTitle] = useState("Overview");
  const [openTask, setOpenTask] = useState(true);
  const options = [
    { title: "Overview", value: <Overview task={task} /> },
    { title: "Execution History", value: <ExeHistory /> },
    { title: "Notes", value: <Notes /> },
  ];
  return (
    <>
      {openTask ? (
        <Card className="my-3 mx-5 first:mt-6 last:mb-6  max-w-5xl flex flex-col gap-9 transition transition-all ease-out duration-300">
          <CardHeader
            className="flex justify-between items-start w-full cursor-pointer"
            onClick={() => setOpenTask(false)}
          >
            <div className="flex items-start gap-4">
              <div className="pt-[2px]">
                <CircleCheckBig className="text-blue-600" />
              </div>
              <div className="flex flex-col justify-start gap-1">
                <h5 className="text-xl font-semibold tracking-wide">
                  {task.title || "Implement Auth Middleware"}
                </h5>
                <div className="flex items-center gap-4">
                  <p className="text-text-secondary text-[13px] font-semibold">
                    #TSK-4f2
                  </p>
                  <Badge className="text-amber-500 bg-amber-800/30 border-yellow-800 ">
                    <TriangleAlert size={14} /> At Risk
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Flag size={14} />
              <p className="text-sm text-text-secondary font-semibold">
                Target: Mar 8
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <header className="flex gap-8 border-b-2 px-3">
              {options.map((option, optIndex) => (
                <h6
                  className={
                    option.title == selectedTitle
                      ? "cursor-pointer text-blue-500 px-2 pb-1 border-b-3 border-blue-500"
                      : "cursor-pointer px-2 pb-1"
                  }
                  onClick={() => setSelectedTitle(option.title)}
                >
                  {option.title}
                </h6>
              ))}
            </header>
            {options.find((option) => option.title == selectedTitle)?.value}
          </CardContent>
        </Card>
      ) : (
        <CollapsedTask setOpenTask={setOpenTask} className="cursor-pointer" />
      )}
    </>
  );
}
