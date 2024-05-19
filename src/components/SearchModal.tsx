import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import SignInForm from "./SignInForm";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "./SignUpForm";
import {
  fetchAllCourses,
  selectCourses,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { IoSearch } from "react-icons/io5";
import { ICourse } from "@/lib/interfaces/course.interface";
import { LoginContext } from "@/lib/context/LoginContext";
import SignInModal from "./SignInModal";

type ModalType = {
  handleCloseModal: () => void;
  openModal: boolean;
};

const SearchModal = ({ handleCloseModal, openModal }: ModalType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const courseState = useSelector(selectCourses);
  const [value, setValue] = React.useState<string>("");
  const [searchedCourses, setSearchedCourses] = React.useState<ICourse[]>([]);
  const [openSignInModal, setOpenSignInModal] = React.useState<boolean>(false);
  const { isClient, userId, userLoggedIn, goToPage, setGoToPage } =
    React.useContext(LoginContext);
  const [fetchLoading, setFetchLoading] = React.useState<boolean>(false);

  const handleOpenSignInModal = () => setOpenSignInModal(true);
  const handleCloseSignInModal = () => setOpenSignInModal(false);

  React.useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  // React.useEffect(() => {
  //   if (courseState?.allCourses) {
  //     setSearchedCourses(courseState?.allCourses);
  //   }
  // }, [courseState?.allCourses]);

  // const searchedCourses = courseState?.allCourses.filter(
  //   (course) =>
  //     course.title.toLowerCase().includes(value.toLowerCase()) ||
  //     course.subject.name.toLowerCase().includes(value.toLowerCase())
  // );

  React.useEffect(() => {
    if (value === "") {
      setSearchedCourses([]);
    } else {
      const results = courseState?.allCourses?.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.subject.name.toLowerCase().includes(value.toLowerCase()) ||
          item.subject.category.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchedCourses(results);
    }
  }, [value, courseState?.allCourses]);
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          borderRadius: "30px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "98vh",
            width: {
              sm: "90%",
              xs: "95%",
            },
            maxWidth: 720,
            overflowY: "auto",
            bgcolor: "#f4f4f5",
            border: "none",
            borderRadius: "10px",
            boxShadow: 24,
            // p: {
            //   md: 4,
            //   sm: 2,
            //   xs: 1,
            // },
          }}
        >
          <div className="sticky top-0 left-0 right-0 border-b-2 flex items-center gap-1">
            {/* <IconButton type="submit" aria-label="search" className=""> */}
            <IoSearch className="text-accent-foreground text-3xl mx-2" />
            {/* </IconButton> */}
            <form
              style={{ display: "flex", alignItems: "center" }}
              className="relative w-full"
            >
              {/* <TextField
              id="search-bar"
              className="text"
              label="Search for courses"
              variant="filled"
              placeholder="Search..."
              size="medium"
              fullWidth
              sx={{}}
            /> */}
              <input
                type="text"
                placeholder="Search for courses"
                className="border-none w-full h-12 focus:outline-none indent-3"
                onChange={(e) => setValue(e.target.value)}
                autoFocus
              />
            </form>
          </div>

          {searchedCourses?.length === 0 && (
            <div className="min-h-16 flex flex-col items-center justify-center text-accent/30">
              <h1>Start by writting something in the search bar</h1>
            </div>
          )}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              // gap: "20px",
              // position: "relative",
              // pb: 2,
            }}
          >
            {searchedCourses?.map((course) => (
              <div
                key={course.id}
                className="w-full py-3 px-8 hover:bg-white  border-b border-muted-foreground first:mt-4 "
              >
                <div className="flex gap-2">
                  <div className="">
                    {/* <img
                    src={course?.coverImage}
                    alt="course-thumbnail"
                    className="h-16 w-16 rounded-lg"
                  /> */}
                    {/* <Chip
                    label={`${course?.subject?.category?.name} > ${course?.subject?.name}`}
                    className={`cursor-pointer`}
                    onClick={() => {}}
                  />{" "} */}
                    <p className="text-xs text-slate-500">
                      {" "}
                      {course?.subject?.category?.name} {">"}{" "}
                      {course?.subject?.name}
                    </p>
                    <div
                      className="flex items-center gap-2 cursor-pointer w-fit group hover:text-secondary"
                      onClick={() => {
                        if (!userLoggedIn) {
                          setGoToPage(`/dashboard/courses/${course.id}`);
                          handleOpenSignInModal();
                          handleCloseModal();
                        } else {
                          router.push(`/dashboard/courses/${course.id}`);
                        }
                      }}
                    >
                      #{" "}
                      <h1 className="text-slate-600 group-hover:text-secondary hover:font-bold hover:underline">
                        {course?.title}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Box>
        </Box>
      </Modal>

      <SignInModal
        openModal={openSignInModal}
        handleCloseModal={handleCloseSignInModal}
      />
    </>
  );
};

export default SearchModal;
