"use client";
import { useEffect, Fragment } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { useGetProjectsQuery } from "@/features/projects/projectsApi";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";

import staticProjects from "@/db/projects.json";
import { AppSidebar } from "@workspace/ui/components/app-sidebar";

export default function Layout({ children }) {
  const { isLoading } = useGetProjectsQuery();
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <SidebarProvider className="w-screen overflow-x-hidden">
      <AppSidebar />
      <SidebarInset className="w-full overflow-x-hidden">
        <header className="flex h-14 shrink-0 fixed bg-background w-full z-50 top-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-5 mt-1"
            />
            <Breadcrumb className="">
              <BreadcrumbList>
                {paths.map((path, index) => {
                  const href = `/${paths.slice(0, index + 1).join('/')}`;
                  const isLast = index === paths.length - 1;
                  const isFirst = index === 0;
                  const title = !isNaN(path)
                    ? (staticProjects[Number(path)]?.name || `Project ${path}`)
                    : path.charAt(0).toUpperCase() + path.slice(1);

                  return (
                    <Fragment key={path}>
                      <BreadcrumbItem className={isFirst ? "hidden md:block" : ""}>
                        {isLast ? (
                          <BreadcrumbPage>{title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && (
                        <BreadcrumbSeparator className={isFirst ? "hidden md:block" : ""} />
                      )}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="pt-14 w-full h-full overflow-x-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
