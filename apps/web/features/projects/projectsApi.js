import { api } from "@/services/api";

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
      transformResponse: (response) => {
        return response?.data?.projects ?? response?.data ?? [];
      },
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: { project },
      }),
      transformResponse: (response) => {
        return response?.data?.project ?? response?.data;
      },
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const { useGetProjectsQuery, useAddProjectMutation } = projectsApi;
