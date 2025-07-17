import HomePage from "./pages/HomePage.js";
import MainLayout from "./layouts/MainLayout.js";
import JobsPage from "./pages/JobsPage.js";
import JobPage, { jobLoader } from "./pages/JobPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AddJobPage from "./pages/AddJobPage.js";
import EditJobPage from "./pages/EditJobPage.js";
import type { NewJob, Job } from "./types.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const addJob = async (newJob: NewJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      throw new Error("failed to add job");
    }
  };

  const deleteJob = async (id: string) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("failed to add job");
    }
  };

  const updateJob = async (updatedJob: Job) => {
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify(updatedJob),
    });

    if (!res.ok) {
      throw new Error("failed to update job");
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element=<JobsPage /> />
        <Route
          path="/jobs/:id"
          loader={jobLoader}
          element={<JobPage deleteJob={deleteJob} />}
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          loader={jobLoader}
          element={<EditJobPage updateJobSubmit={updateJob} />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
