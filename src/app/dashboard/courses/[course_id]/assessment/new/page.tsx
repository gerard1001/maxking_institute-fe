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
  selectCourses,
  selectQuestions,
  selectTags,
  selectUsers,
  updateCourse,
  updateModule,
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
  FormHelperText,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus, FaRegEye } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { IoWarningOutline } from "react-icons/io5";
import LoadinProgress from "@/components/LoadingProgess";
import { BsChevronDown } from "react-icons/bs";
// import ReactQuill from "@/components/ReactQuill";
import { set } from "date-fns";
import { Choice } from "@/lib/interfaces/question.interface";
import BackIconButton from "@/components/BackIconButton";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("@/components/ReactQuill"), {
  ssr: false,
});

interface PageProps {
  params: {
    course_id: string;
  };
}

const AddCourseAssessment = ({ params: { course_id } }: PageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const questionState = useSelector(selectQuestions);
  const divRef = React.useRef<HTMLDivElement>(null);
  const [body, setBody] = React.useState("");
  const [choices, setChoices] = React.useState<string[]>([]);
  const [choice, setChoice] = React.useState("");
  const [questionId, setQuestionId] = React.useState("");
  const [trueAnswer, setTrueAnswer] = React.useState<string>("");
  const [openModuleDialog, setOpenModuleDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    question: "",
    trueAnswer: "",
    choices: "",
  });

  const handleOpenModuleDialog = () => {
    setOpenModuleDialog(true);
  };
  const handleCloseModuleDialog = () => {
    setOpenModuleDialog(false);
  };

  const handleDeleteChoice = (index: number) => {
    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    setChoices(updatedChoices);
  };

  React.useEffect(() => {
    dispatch(findByModuleOrCourseId(course_id))
      .unwrap()
      .then((res) => {
        console.log(res, "res");
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  const handleSubmit = () => {
    if (body.trim() === "") {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        question: "Question is required",
      }));
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        question: "",
      }));
    }
    if (trueAnswer.trim() === "") {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        trueAnswer: "True Answer is required",
      }));
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        trueAnswer: "",
      }));
    }
    if (choices.length === 0) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        choices: "At least one choice is required",
      }));
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        choices: "",
      }));
    }

    if (body.trim() !== "" && trueAnswer.trim() !== "" && choices.length > 0) {
      console.log({
        question: body,
        choices,
        trueAnswer,
      });

      dispatch(
        addQuestion({
          id: course_id,
          data: { question: body, choices, trueAnswer },
        })
      )
        .unwrap()
        .then((res) => {
          if (res.statusCode === 201) {
            enqueueSnackbar(res.message, { variant: "success" });
            // router.push(`/dashboard/courses/${course_id}/assessment`);
            setBody("");
            setChoices([]);
            setChoice("");
            setTrueAnswer("");
            dispatch(findByModuleOrCourseId(course_id))
              .unwrap()
              .then((res) => {
                console.log(res, "res");
              })
              .catch((err) => {
                enqueueSnackbar(err.message, { variant: "error" });
              });
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
    }
  };

  const handleDeleteQuestion = () => {
    setLoading(true);
    dispatch(deleteQuestion(questionId))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, { variant: "success" });
          handleCloseModuleDialog();
          dispatch(findByModuleOrCourseId(course_id))
            .unwrap()
            .then((res) => {
              console.log(res, "res");
            })
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: "error" });
            });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <BackIconButton />
      <div className="w-full h-fit flex flex-col items-start mt-6">
        <h1 className="text-xl font-semibold ml-1 text-accent">
          Compose Assessment question
        </h1>
        <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-7 px-8 rounded-lg">
          <ReactQuill setBody={setBody} body={body} />
          {errors.question && (
            <p className="text-xs text-red-500 mt-1">{errors.question}</p>
          )}
        </div>
      </div>
      <div className="w-full h-fit flex flex-col items-start mt-6">
        <h1 className="text-xl font-semibold ml-1 text-accent">Add choices</h1>
        <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-7 px-8 rounded-lg">
          <div className="w-full flex flex-col items-start">
            {choices.map((choice, index) => (
              <div className="w-full flex items-center justify-between">
                <p className="text-lg font-medium">{index + 1}.</p>
                <p className="text-lg font-medium">{choice}</p>
                <div className="flex items-center space-x-2">
                  <IconButton
                    onClick={() => {
                      handleDeleteChoice(index);
                    }}
                  >
                    <TbTrash />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-between mt-4 gap-4">
            {/* <TextField
              variant="outlined"
              label="Add choice"
              className="w-3/4"
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
            /> */}
            <TextField
              sx={{
                input: {
                  color: "#021527",
                },
                color: "#242E8F",
                "& label.Mui-focused": {
                  color: "#242E8F",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: "1.5px solid #242E8F",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  py: "14px",
                },
                "& .MuiFormLabel-root": {
                  mt: "3px",
                },
              }}
              inputProps={{ style: { height: 18 } }}
              label="Add Choice"
              variant="outlined"
              fullWidth
              size="small"
              className="text-xs"
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              error={!!errors.choices}
              helperText={errors.choices ? errors.choices : ""}
            />
            {choice && (
              <IconButton
                onClick={() => {
                  setChoices([...choices, choice]);
                  setChoice("");
                }}
              >
                <FaPlus />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      {choices?.length > 0 && (
        <div className="w-full h-fit flex flex-col items-start mt-6">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            True Answer
          </h1>
          <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-7 px-8 rounded-lg">
            {/* <div className="w-full flex items-center justify-between">
              <p className="text-lg font-medium">{trueAnswer}</p>
              <div className="flex items-center space-x-2">
                <IconButton
                  onClick={() => {
                    setTrueAnswer("");
                  }}
                >
                  <TbTrash />
                </IconButton>
              </div>
            </div> */}
            <div className="w-full flex items-center justify-between mt-4">
              <FormControl
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": {
                    top: "12px",
                  },
                  color: "#242E8F",
                  "& label.Mui-focused": {
                    color: "#242E8F",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "1.5px solid #242E8F",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    py: "11.5px",
                  },
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  True Answer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={trueAnswer}
                  onChange={(e) => setTrueAnswer(e.target.value as string)}
                  sx={{
                    input: {
                      color: "#021527",
                    },
                    mt: 2,
                  }}
                >
                  {choices.map((choice, index) => (
                    <MenuItem value={choice} key={index}>
                      {choice}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {/* {errors.tutor && errors.tutor?.message} */}
                  {errors.trueAnswer && errors.trueAnswer}
                </FormHelperText>
              </FormControl>
            </div>
          </div>
        </div>
      )}
      <Button
        type="submit"
        variant="contained"
        className="bg-primary hover:bg-primary/90 w-full max-w-32 mt-4 mb-10 !h-[46px]"
        // size="large"
        onClick={handleSubmit}
      >
        Submit
      </Button>

      {/* <div className="w-full bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg"> */}
      <div className="w-full pb-12">
        <h1 className="text-accent font-semibold text-xl mb-5">
          Added Questions
        </h1>
        {questionState?.allQuestions?.length > 0 &&
          questionState?.allQuestions?.map((question, index: number) => (
            <Accordion
              key={question.id}
              onChange={() => {
                // setModuleId(module.id);
              }}
            >
              <AccordionSummary
                expandIcon={<BsChevronDown />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                {/* {module.moduleNumber}: {module.title} */}
                <h1 className="text-lg font-medium">Question {index + 1}</h1>
              </AccordionSummary>
              <AccordionDetails>
                <div className="">
                  <div
                    ref={divRef}
                    dangerouslySetInnerHTML={{
                      __html: question?.question || "",
                    }}
                  />
                  <div className="">
                    <h1 className="text-accent font-semibold text-lg mt-4">
                      Choices
                    </h1>
                    {JSON.parse(question?.choices)?.map(
                      (choice: Choice, index2: number) => (
                        <div
                          className="w-full flex items-center gap-3 pl-4"
                          key={index2 + 1}
                        >
                          <p className="text-lg font-medium">{index2 + 1}.</p>
                          <p
                            className={`${
                              question?.trueAnswer === choice?.choice
                                ? "font-semibold"
                                : ""
                            }`}
                          >
                            {choice.choice}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </AccordionDetails>
              <AccordionActions>
                <div className="flex gap-2">
                  {/* <IconButton
                    className="bg-muted-foreground/20 hover:bg-muted-foreground/50"
                    // onClick={handleOpenModuleModal}
                  >
                    <MdEdit className="text-blue-700" />
                  </IconButton> */}
                  <IconButton
                    className="bg-muted-foreground/20 hover:bg-muted-foreground/50"
                    onClick={() => {
                      handleOpenModuleDialog(), setQuestionId(question.id);
                    }}
                  >
                    <TbTrash className="text-red-600" />
                  </IconButton>
                </div>
              </AccordionActions>
            </Accordion>
          ))}
      </div>
      <Dialog
        open={openModuleDialog}
        onClose={handleCloseModuleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="flex flex-col items-center justify-center gap-2 w-[440px] mx-auto p-4">
          <div className="w-fit p-4 rounded-full bg-red-200">
            <IoWarningOutline className="text-red-500 text-3xl font-semibold" />
          </div>
          <h1 className="text-xl font-semibold">Are you sure?</h1>
          <p className="text-center">
            This action will completely remove this Assessment question. Still
            wish to proceed?
          </p>
          <Button
            fullWidth
            onClick={handleDeleteQuestion}
            className="bg-red-500 text-white hover:bg-red-400 !h-9"
            disabled={loading}
          >
            {loading ? <LoadinProgress className="!h-8 !w-8" /> : "Delete"}
          </Button>
          <Button
            fullWidth
            onClick={handleCloseModuleDialog}
            autoFocus
            variant="contained"
            className="bg-slate-200 text-accent hover:bg-slate-100 !h-9"
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default AddCourseAssessment;
