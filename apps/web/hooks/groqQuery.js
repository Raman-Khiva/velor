"use client"
import Groq from "groq-sdk"
import { useAddProjectMutation } from "@/features/projects/projectsApi"

const generatePrompt = (query) => {
  const prompt = `You are a system that generates structured software project plans.

  Return ONLY valid JSON following the exact schema described below.
  Do not include explanations, markdown, or comments.

  The JSON must represent a complete project including phases, milestones, and tasks.

  -----------------------
  DATABASE SCHEMA STRUCTURE
  -----------------------

  Project
  - name: string (name of the project)
  - description: string (short explanation of the project idea)
  - type: string (category such as SaaS Application, CLI Tool, Web App, Mobile App)
  - techStack: string[] (list of technologies used in the project)
  - status: string (project state such as "planning", "active", "completed")
  - startDate: strict ISO format date string (e.g., "2024-01-01T00:00:00Z")
  - targetDate: strict ISO format date string (e.g., "2024-06-30T00:00:00Z")
  - owner: string (name of project creator)
  - phases: Phase[]

  Phase
  - name: string (phase title such as "Project Setup", "Core Development")
  - description: string (what this phase accomplishes)
  - order: integer (phase order starting from 1)
  - status: string ("pending", "active", "completed")
  - progress: integer (0-100 percentage progress)
  - milestones: Milestone[]

  Milestone
  - title: string (specific goal within the phase)
  - description: string (details about milestone objective)
  - progress: integer (0-100 completion percentage)
  - tasks: Task[]

  Task
  - title: string (actionable development step)
  - type: string (example values: setup, configuration, implementation, testing, deployment)
  - purpose: string (why the task is needed)
  - commands: string[] (terminal commands required to perform the task if applicable)
  - done: boolean (task completion state)

  -----------------------
  IMPORTANT RULES
  -----------------------

  1. Output must be valid JSON.
  2. Do not include database IDs (they are generated automatically).
  3. techStack must always be an array.
  4. commands is optional but must be an array if present.
  5. progress values must be integers between 0 and 100.
  6. Each phase must contain 2–4 milestones.
  7. Each milestone must contain 2–4 tasks.
  8. Tasks should be realistic developer actions.

  -----------------------
  OUTPUT FORMAT
  -----------------------

  output must strictly follow this JSON structure and should be praseable  with no additional text:
  cross check the output to follow json structure
  Return a JSON object with this structure:

  {
    "name": "...",
    "description": "...",
    "type": "...",
    "techStack": [],
    "status": "...",
    "startDate": "...",
    "targetDate": "...",
    "owner": "...",
    "phases": [
      {
        "name": "...",
        "description": "...",
        "order": 1,
        "status": "...",
        "progress": 0,
        "milestones": [
          {
            "title": "...",
            "description": "...",
            "progress": 0,
            "tasks": [
              {
                "title": "...",
                "type": "...",
                "purpose": "...",
                "commands": [],
                "done": false
              }
            ]
          }
        ]
      }
    ]
  }

  -----------------------
  PROJECT IDEA = ${query}`

  //   const prompt = `
  // You are a senior software architect and project planner.

  // Generate a detailed software project plan in well-structured Markdown format.

  // The response should feel like a professional project specification document.

  // Use proper Markdown formatting including:
  // - headings
  // - subheadings
  // - bullet lists
  // - numbered lists
  // - code blocks for commands
  // - tables where appropriate

  // -----------------------
  // PROJECT REQUIREMENTS
  // -----------------------

  // The project plan must include:

  // # Project Overview
  // - Project name
  // - Description
  // - Project category/type
  // - Recommended tech stack
  // - Estimated timeline
  // - Suggested architecture
  // - Main goals

  // # Development Phases

  // Each phase should include:
  // - Phase title
  // - Objective
  // - Deliverables
  // - Estimated duration

  // Each phase must contain 2–4 milestones.

  // Each milestone must contain:
  // - milestone title
  // - explanation
  // - realistic development tasks

  // # Tasks

  // Each task should include:
  // - actionable development step
  // - why it matters
  // - optional terminal commands if applicable

  // Use realistic engineering practices and workflows.

  // -----------------------
  // FORMAT RULES
  // -----------------------

  // 1. Return Markdown only.
  // 2. Do not return JSON.
  // 3. Make the output highly readable.
  // 4. Use nested headings correctly.
  // 5. Use checklists for tasks where useful.
  // 6. Use fenced code blocks for terminal commands.
  // 7. Make the structure visually clean.
  // 8. Use professional engineering terminology.

  // -----------------------
  // EXAMPLE STYLE
  // -----------------------

  // # Project Name

  // ## Overview

  // Description...

  // ## Recommended Tech Stack

  // - Next.js
  // - PostgreSQL
  // - Prisma

  // ## Phase 1 — Project Setup

  // ### Milestone: Repository Initialization

  // #### Tasks

  // - [ ] Create monorepo structure
  // - [ ] Configure TypeScript
  // - [ ] Setup ESLint

  // \`\`\`bash
  // pnpm install
  // \`\`\`

  // -----------------------
  // PROJECT IDEA
  // -----------------------

  // ${query}
  // `
  return prompt
}

export const useGroq = () => {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY
  const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true })
  const generate = async (query) => {
    console.log("Generating project plan for idea:", query)
    try {
      const prompt = generatePrompt(query)
      const result = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        max_tokens: 8000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      })
      console.log("Raw GROQ Response:", result)
      const groqGeneratedProject = await result.choices[0].message.content
      return groqGeneratedProject
    } catch (error) {
      console.error("Error executing GROQ query:", error)
      return null
    }
  }

  return { generate }
}
