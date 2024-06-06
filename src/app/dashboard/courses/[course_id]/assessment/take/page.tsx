"use client";

import {
  addQuestion,
  createUserCourse,
  createUserModule,
  deleteChapter,
  deleteCourse,
  deleteModule,
  deleteQuestion,
  fetchAllQuestions,
  fetchAllTags,
  fetchAllUsers,
  fetchOneCourse,
  fetchOneModule,
  fetchUserById,
  findByModuleOrCourseId,
  findByUserAndCourseId,
  selectCourses,
  selectQuestions,
  selectTags,
  selectUsers,
  updateCourse,
  updateModule,
  updateUserCourse,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaPlus, FaRegEye } from "react-icons/fa6";
import { MdCloudUpload, MdEdit, MdOutlineClose } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ITag } from "@/lib/interfaces/tag.interface";
import { IoOptionsOutline, IoWarningOutline } from "react-icons/io5";
import LoadinProgress from "@/components/LoadingProgess";
import { BsBack, BsChevronDown } from "react-icons/bs";
import Link from "next/link";
import { LoginContext } from "@/lib/context/LoginContext";
import { RiFilePaper2Line } from "react-icons/ri";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import { IModule } from "@/lib/interfaces/module.interface";
import ReactQuill from "@/components/ReactQuill";
import { set } from "date-fns";
import { Choice } from "@/lib/interfaces/question.interface";
import BackIconButton from "@/components/BackIconButton";
import DashboardFooter from "@/components/DashboardFooter";

interface PageProps {
  params: {
    course_id: string;
  };
}

const TakeAssessment = ({ params: { course_id } }: PageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const questionState = useSelector(selectQuestions);
  const courseState = useSelector(selectCourses);
  const userState = useSelector(selectUsers);
  const divRef = React.useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [answers, setAnswers] = React.useState<any>({});
  const [errors, setErrors] = React.useState<any>({});
  const [grade, setGrade] = React.useState<string | null>(null);
  const { userId } = React.useContext(LoginContext);

  React.useEffect(() => {
    dispatch(findByModuleOrCourseId(course_id))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });

    dispatch(fetchOneCourse(course_id))
      .unwrap()
      .catch((err) => {
        if (err.statusCode === 404) {
          router.push(`/dashboard/courses`);
        }
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  // const [value, setValue] = React.useState<{ [x: number]: string }>({});
  // const [helperText, setHelperText] = React.useState("Choose wisely");
  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue((event.target as HTMLInputElement).value);
  //   setHelperText(" ");
  //   setError(false);
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (value === "best") {
  //     setHelperText("You got it!");
  //     setError(false);
  //   } else if (value === "worst") {
  //     setHelperText("Sorry, wrong answer!");
  //     setError(true);
  //   } else {
  //     setHelperText("Please select an option.");
  //     setError(true);
  //   }
  // };

  const handleChange = (questionId: string, selectedChoice: any) => {
    setAnswers({ ...answers, [questionId]: selectedChoice });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: any = {};
    // let hasError = false;
    let score = 0;
    let totalQuestions = 0;

    questionState?.allQuestions?.forEach((questionData) => {
      totalQuestions++;
      if (!answers[questionData.id]) {
        newErrors[questionData.id] = "Please select an answer";
        // hasError = true;
      } else if (answers[questionData.id] === questionData.trueAnswer) {
        score++;
      }
    });

    const percentageGrade = (score / totalQuestions) * 100;
    setGrade(percentageGrade.toFixed(2));

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setTimeout(() => {
        setSubmitted(true);
        setErrors({});
      }, 500);
      if (Number.isNaN(percentageGrade)) {
        enqueueSnackbar("Please select an answer", { variant: "error" });
      } else if (userId) {
        dispatch(findByUserAndCourseId({ userId, courseId: course_id }))
          .unwrap()
          .then((res) => {
            if (res.statusCode === 200) {
              if (res.data.rank) {
                enqueueSnackbar("You have already taken this assessment", {
                  variant: "error",
                });
                return;
              }
              dispatch(
                updateUserCourse({
                  id: res.data.id,
                  data: {
                    rank: `${percentageGrade.toFixed(2)}`,
                  },
                })
              )
                .unwrap()
                .then((res) => {
                  if (res.statusCode === 200) {
                    enqueueSnackbar(
                      "Course Assessment completed successfully",
                      {
                        variant: "success",
                      }
                    );
                    // setTimeout(() => {
                    //   router.back();
                    // }, 1000);

                    dispatch(fetchUserById(userId))
                      .unwrap()
                      .catch((err) => {
                        enqueueSnackbar(err.message, { variant: "error" });
                      });
                  }
                })
                .catch((err) => {
                  enqueueSnackbar(err.message, { variant: "error" });
                });
            } else {
              enqueueSnackbar("You have already taken this assessment", {
                variant: "error",
              });
            }
          });
      }
    }
  };

  return (
    <div className="pb-10">
      <BackIconButton />
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        className="block bg-white p-4 shadow-md rounded-md max-w-[1200px] mx-auto"
      >
        <h1 className="text-accent font-semibold text-2xl mt-3">
          {courseState?.course?.title}
        </h1>
        {questionState?.allQuestions?.length > 0 &&
          questionState?.allQuestions?.map((questionData, index1: number) => (
            <div key={questionData.id} className="mt-4 border-t-[1.5px]">
              <FormControl component="fieldset">
                <FormLabel component="legend" className="block mb-6">
                  <h1 className="text-accent font-semibold text-xl">
                    {index1 + 1}.
                  </h1>
                  <div
                    ref={divRef}
                    dangerouslySetInnerHTML={{
                      __html: questionData?.question || "",
                    }}
                  />
                </FormLabel>
                <RadioGroup
                  aria-label={questionData.question}
                  name={questionData.id}
                  value={answers[questionData.id] || ""}
                  onChange={(e) =>
                    handleChange(questionData.id, e.target.value)
                  }
                >
                  {JSON.parse(questionData.choices).map(
                    (choice: Choice, index2: number) => (
                      <FormControlLabel
                        key={index2}
                        value={choice.choice}
                        disabled={submitted}
                        sx={{
                          mt: 1,
                        }}
                        control={
                          <Radio
                            sx={{
                              color: `${
                                submitted &&
                                choice.choice === questionData.trueAnswer
                                  ? "#242E8F"
                                  : submitted &&
                                    answers[questionData.id] !== choice.choice
                                  ? "grey"
                                  : "#a55109"
                              }`,
                              "&.Mui-checked": {
                                color: `${
                                  submitted &&
                                  choice.choice === questionData.trueAnswer
                                    ? "#242E8F"
                                    : submitted &&
                                      answers[questionData.id] !== choice.choice
                                    ? "grey"
                                    : submitted
                                    ? "#a55109ab"
                                    : "#a55109"
                                }`,
                              },
                              "&.Mui-disabled": {
                                color: `${
                                  submitted &&
                                  choice.choice === questionData.trueAnswer
                                    ? "#242E8Fab"
                                    : submitted &&
                                      answers[questionData.id] !== choice.choice
                                    ? "grey"
                                    : submitted
                                    ? "#a55109ab"
                                    : "#a55109"
                                }`,
                              },
                            }}
                          />
                        }
                        label={choice.choice}
                      />
                    )
                  )}
                </RadioGroup>
                {errors[questionData.id] && (
                  <Typography variant="caption" color="error">
                    {errors[questionData.id]}
                  </Typography>
                )}
              </FormControl>
            </div>
          ))}
        {userState?.user?.courses?.find((course) => course.id === course_id)
          ?.user_course?.rank ? (
          <Button
            variant="contained"
            // disabled={submitted}
            startIcon={<FaArrowLeft />}
            sx={{ mb: 3, mt: 10 }}
            className="bg-primary text-white w-[180px]"
            onClick={() => router.back()}
          >
            Back
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            disabled={submitted}
            sx={{ mb: 3, mt: 10 }}
            className="bg-primary text-white w-[180px]"
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default TakeAssessment;
