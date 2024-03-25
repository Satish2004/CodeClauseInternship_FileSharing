import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "Delete all files that are marked for deletion.",
  { minutes: 10 }, // every minute
  internal.files.deleteAllFiles
);

export default crons;
