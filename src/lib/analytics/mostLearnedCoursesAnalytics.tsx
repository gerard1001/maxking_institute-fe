import { ICourse } from "../interfaces/course.interface";

export default function mostLearnedCoursesAnalytics(courses: ICourse[]) {
  const data: any[] = [];

  courses?.forEach((course) => {
    const learners = course?.users?.filter(
      (user) => user?.user_course?.userType === "STUDENT"
    );

    const name = `${course?.title}`;
    data.push({ counts: learners ? learners.length : 0, name });
  });

  const sortedData = data.sort((a: any, b: any) =>
    a.counts < b.counts ? 1 : -1
  );
  const reducedData = [];
  const colors = ["#2471A3", "#F4D03F", "#16A085", "#2E4053", "#6A8DE9"];

  for (let i = 0; i < sortedData.length && i < 5; i++) {
    const { counts, name } = sortedData[i];
    reducedData.push([`${name}`, counts, colors[i]]);
  }

  const res = [
    ["Course Name", "learners", { role: "style" }],
    ...reducedData.splice(0, 10),
  ];
  return res;
}
