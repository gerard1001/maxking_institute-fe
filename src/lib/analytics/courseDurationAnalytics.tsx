import { ICourse } from "../interfaces/course.interface";

export default function courseDurationAnalytics(courses: ICourse[]) {
  const data: any = {
    "< 30 minutes": 0,
    "30 - 60 minutes": 0,
    "1 - 2 hours": 0,
    "2 - 4 hours": 0,
    "4 - 8 hours": 0,
    "8 - 10 hours": 0,
    "10+ hours": 0,
  };

  courses?.forEach((course) => {
    const estimatedDuration = course?.estimatedDuration;
    data[estimatedDuration] = data[estimatedDuration]
      ? data[estimatedDuration] + 1
      : 1;
  });

  data["< 30 minutes"] = data["< 30 minutes"] || 0;
  data["30 - 60 minutes"] = data["30 - 60 minutes"] || 0;
  data["1 - 2 hours"] = data["1 - 2 hours"] || 0;
  data["2 - 4 hours"] = data["2 - 4 hours"] || 0;
  data["4 - 8 hours"] = data["4 - 8 hours"] || 0;
  data["8 - 10 hours"] = data["8 - 10 hours"] || 0;
  data["10+ hours"] = data["10+ hours"] || 0;

  const res = [
    ["Duration", `Number of courses`],
    ["< 30 minutes", data["< 30 minutes"]],
    ["30 - 60 minutes", data["30 - 60 minutes"]],
    ["1 - 2 hours", data["1 - 2 hours"]],
    ["2 - 4 hours", data["2 - 4 hours"]],
    ["4 - 8 hours", data["4 - 8 hours"]],
    ["8 - 10 hours", data["8 - 10 hours"]],
    ["10+ hours", data["10+ hours"]],
  ];

  return res;
}
