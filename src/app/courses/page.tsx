"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import {
  createCategory,
  createSubject,
  deleteCategory,
  deleteSubject,
  fetchAOneCategory,
  fetchAllCategories,
  fetchOneSubject,
  fetchSubjectsByCategoryId,
  selectCategories,
  selectSubjects,
  updateCategory,
  updateSubject,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import { MdCloudUpload, MdOutlineClose } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import LoadinProgress from "@/components/LoadingProgess";
import { HiDotsHorizontal } from "react-icons/hi";
// import { IoWarningOutline } from "react-icons/io5";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import { LoginContext } from "@/lib/context/LoginContext";
import BackIconButton from "@/components/BackIconButton";

// const schema = yup.object().shape({
//   name: yup.string().required().min(3).max(40),
// });

// interface CreateCategoryInputs {
//   name: string;
// }

// interface SubjectProps {
//   params: {
//     subject_id: string;
//   };
// }

const Categories = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const state = useSelector(selectCategories);
  const subjectState = useSelector(selectSubjects);
  // const [value, setValue] = React.useState("categories");
  // const [openModal, setOpenModal] = React.useState<boolean>(false);
  // const [openSubjectModal, setOpenSubjectModal] =
  //   React.useState<boolean>(false);
  // const [picture, setPicture] = React.useState<Blob | any>("");
  // const [picUrl, setPicUrl] = React.useState<any>(null);
  // const [imageError, setImageError] = React.useState<string | null>(null);
  // const [loading, setLoading] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [subAnchorEl, setSubAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  // const open = Boolean(anchorEl);
  // const openSub = Boolean(subAnchorEl);
  // const [openDialog, setOpenDialog] = React.useState(false);
  // // const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  // const [deletingSubject, setDeletingSubject] = React.useState<boolean>(false);
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [subjectId, setSubjectId] = React.useState<string>("");
  // const [onEdit, setOnEdit] = React.useState<boolean>(false);
  // const [onEditSub, setOnEditSub] = React.useState<boolean>(false);
  const [parentDeleted, setParentDeleted] = React.useState<boolean>(false);
  const category = state?.category;
  const { isClient } = React.useContext(LoginContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSub = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSubAnchorEl(event.currentTarget);
  };
  // const handleCloseSub = () => {
  //   setSubAnchorEl(null);
  // };

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  // const handleOpenDialog = () => {
  //   setOpenDialog(true);
  // };
  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  React.useEffect(() => {
    dispatch(fetchAllCategories())
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          setCategoryId(res.data[0].id);
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  }, []);

  React.useEffect(() => {
    if (categoryId && categoryId !== "") {
      dispatch(fetchAOneCategory(categoryId))
        .unwrap()
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, [categoryId]);

  React.useEffect(() => {
    if (subjectId && subjectId !== "") {
      dispatch(fetchOneSubject(subjectId))
        .unwrap()
        .catch((err) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, [subjectId]);

  React.useEffect(() => {
    if (typeof category === "object" && !objectIsEmpty(category)) {
      dispatch(fetchSubjectsByCategoryId(state?.category?.id))
        .unwrap()
        .catch((err: any) => {
          enqueueSnackbar(err.message, {
            variant: "error",
            preventDuplicate: true,
          });
        });
    }
  }, [state]);

  // React.useEffect(() => {
  //   if (
  //     typeof subjectState?.subject === "object" &&
  //     !objectIsEmpty(subjectState?.subject) &&
  //     onEditSub
  //   ) {
  //     const { name } = subjectState?.subject;
  //     name && setCategoryValue("name", name);
  //   }
  // }, [subjectState, onEditSub]);

  // React.useEffect(() => {
  //   if (picture) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       setPicUrl(e.target.result);
  //     };
  //     reader.readAsDataURL(picture);
  //   }
  // }, [picture]);

  return (
    <div className="p-10">
      <BackIconButton />
      <Box className={`w-full flex gap-4 ${isClient && "mt-10"}`}>
        <div className="min-h-[30vh] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[320px]">
          {state?.allCategories?.length === 0 ? (
            <div className="p-4">
              <h1 className="text-center text-xl text-accent font-bold">
                No categories yet
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="text-center text-accent font-semibold text-lg">
                Categories
              </h1>
              {state?.allCategories?.map((category) => {
                return (
                  <div key={category.id} className={`py-1`}>
                    <div
                      className={`p-1 pl-3 ${
                        categoryId === category.id ||
                        state?.category?.id === category.id
                          ? "bg-slate-300"
                          : "hover:bg-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center gap-2 w-full cursor-pointer"
                          onClick={() => {
                            // setParentDeleted(false);
                            setCategoryId(category.id);
                          }}
                        >
                          <img
                            src={category.image}
                            alt=""
                            className="w-[40px] p-1 aspect-square object-cover rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] fill-lime-700 bg-whhite bg-blend-multiply"
                          />
                          <p className="text-accent line-clamp-2 leading-4">
                            {category.name}
                          </p>
                        </div>
                        {/* {!isClient && (
                          <IconButton
                            onClick={(
                              event: React.MouseEvent<HTMLButtonElement>
                            ) => {
                              handleClick(event);
                              setCategoryId(category.id);
                            }}
                          >
                            <HiDotsHorizontal />
                          </IconButton>
                        )} */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="min-h-[30vh] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full p-4">
          {state?.category &&
          typeof category === "object" &&
          !objectIsEmpty(category) &&
          !parentDeleted ? (
            <>
              <div className="flex items-center gap-2 justify-center">
                <h1 className="text-xl font-semibold text-accent text-center">
                  {state?.category?.name}
                </h1>
                {/* {subjectState?.allSubjects?.length > 0 && (
                  <IconButton
                    onClick={handleOpenSubjectModal}
                    className="bg-slate-100 hover:bg-slate-200"
                  >
                    <FaPlus className="text-sm" />
                  </IconButton>
                )} */}
              </div>
              {subjectState?.allSubjects?.length === 0 ? (
                <div className="p-4">
                  <h1 className="text-center text-xl text-accent font-bold">
                    No subjects here yet
                  </h1>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 xs:grid-cols-2 grid-cols-1 gap-2 pt-4 cursor-pointer">
                  {subjectState?.allSubjects?.map((subject, index) => {
                    return (
                      <div
                        key={subject.id}
                        className={`py-1 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg`}
                      >
                        <div className={`p-1 pl-3`}>
                          <div className="flex items-center justify-between">
                            <div
                              className="flex flex-col items-start gap-0 w-full cursor-pointer hover:bg-slate-200 p-2 rounded-lg"
                              onClick={() => {
                                router.push(`/courses/subject/${subject.id}`);
                              }}
                            >
                              <p className="text-accent line-clamp-2">
                                {subject.name}
                              </p>
                              <p className="text-secondary line-clamp-1 text-xs">
                                ({subject?.courses?.length} Courses)
                              </p>
                            </div>
                            {/* {!isClient ?? (
                              <IconButton
                                onClick={(
                                  event: React.MouseEvent<HTMLButtonElement>
                                ) => {
                                  handleClickSub(event);
                                  setSubjectId(subject.id);
                                }}
                              >
                                <HiDotsHorizontal />
                              </IconButton>
                            )} */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div>
              <div className="p-4">
                <h1 className="text-center text-xl text-accent font-bold">
                  Select a category from the left
                </h1>
              </div>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Categories;
