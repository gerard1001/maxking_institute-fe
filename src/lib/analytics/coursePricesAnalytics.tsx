import { ICourse } from "../interfaces/course.interface";

export default function coursePricesAnalytics(courses: ICourse[]) {
  const data: any = [];

  courses?.forEach((course) => {
    const price = course?.price;

    if (price) {
      data.push({ counts: price, name: course?.title });
    }

    // const name = `${course?.title}`;
    // data.push({ counts: learners ? learners.length : 0, name });
  });

  // const sortedData = data.sort((a, b) => (a.counts < b.counts ? 1 : -1));
  const reducedData = [];
  const colors = ["#E20BAC", "#76D7C4", "#DC7633", "#16F0E7", "#6A8DE9"];

  for (let i = 0; i < data.length && i < 5; i++) {
    const { counts, name } = data[i];
    reducedData.push([`${name}`, counts, colors[i]]);
  }

  const res = [["Course Price", "prices", { role: "style" }], ...reducedData];
  return res;
}
