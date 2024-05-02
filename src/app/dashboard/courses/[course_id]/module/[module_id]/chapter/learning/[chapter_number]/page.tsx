"use client";

import {
  fetchOneModule,
  selectChapters,
  selectModules,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";

export interface ModuleLearningProps {
  params: {
    module_id: string;
    course_id: string;
    chapter_number: number;
  };
}

const ModuleLearning = ({
  params: { chapter_number, course_id, module_id },
}: ModuleLearningProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const divRef = React.useRef<HTMLDivElement>(null);
  const moduleState = useSelector(selectModules);
  // const chapterState = useSelector(selectChapters);

  // const currentChapter = moduleState?.allModules?.map((module) =>
  //   module.chapters.find((chapter) => chapter.chapterNumber === chapter_number)
  // );
  const currentChapter = moduleState?.module?.chapters.find(
    (chapter) => chapter.chapterNumber === Number(chapter_number)
  );
  console.log(currentChapter, "currentChapter");
  console.log(moduleState, "moduleState");
  console.log(chapter_number, "chapnb");

  React.useEffect(() => {
    dispatch(fetchOneModule(module_id))
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);
  return (
    <div className="pb-12">
      <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg mb-6">
        <h1 className="text-accent font-semibold text-2xl mt-3">
          {currentChapter?.title}
        </h1>
        <p className="text-accent">{currentChapter?.description}</p>
      </div>
      <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg">
        <h1 className="text-accent font-semibold text-xl">Course content</h1>
        <div
          ref={divRef}
          dangerouslySetInnerHTML={{
            __html: currentChapter?.content || "",
          }}
        />
      </div>
    </div>
  );
};

export default ModuleLearning;
