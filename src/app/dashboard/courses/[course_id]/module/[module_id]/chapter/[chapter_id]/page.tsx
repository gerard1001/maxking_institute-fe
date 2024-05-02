import React from "react";

interface ChapterProps {
  params: {
    course_id: string;
    module_id: string;
    chapter_id: string;
  };
}

const page = ({
  params: { course_id, chapter_id, module_id },
}: ChapterProps) => {
  return <div>page</div>;
};

export default page;
