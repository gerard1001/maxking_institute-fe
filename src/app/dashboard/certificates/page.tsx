"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { LoginContext } from "@/lib/context/LoginContext";
import React from "react";
import ClientCertificates from "@/components/ClientCertificates";
import AdminCertificates from "@/components/AdminCertificates";

const Certificates = () => {
  const { isClient } = React.useContext(LoginContext);
  return (
    <ProtectedRoute>
      {isClient ? <ClientCertificates /> : <AdminCertificates />}
    </ProtectedRoute>
  );
};

export default Certificates;

// "use client";

// import { LoginContext } from "@/lib/context/LoginContext";
// import { objectIsEmpty } from "@/lib/functions/object_check.function";
// import {
//   fetchAllCourses,
//   fetchUserById,
//   selectCourses,
//   selectUsers,
//   useDispatch,
//   useSelector,
// } from "@/lib/redux";
// import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useSnackbar } from "notistack";
// import React from "react";
// import { MdOutlineClose } from "react-icons/md";

// const AdminCertificates = () => {
//   const dispatch = useDispatch();
//   const { enqueueSnackbar } = useSnackbar();
//   const courseState = useSelector(selectCourses);
//   const userState = useSelector(selectUsers);
//   const router = useRouter();

//   const [openModal, setOpenModal] = React.useState<boolean>(false);

//   const { isClient, userId, loginData } = React.useContext(LoginContext);

//   const loggedInUser = objectIsEmpty(userState.user)
//     ? userState.loggedInUser
//     : userState.user;

//   const certificateCourseIds = loggedInUser?.certificates?.map(
//     (certificate) => certificate.courseId
//   );

//   const certificateCourses = courseState.allCourses.filter((course) =>
//     certificateCourseIds?.includes(course.id)
//   );

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   React.useEffect(() => {
//     dispatch(fetchAllCourses())
//       .unwrap()
//       .then((res) => {})
//       .catch((err) => {
//         enqueueSnackbar(err.message, { variant: "error" });
//       });

//     if (loginData && !objectIsEmpty(loginData)) {
//       dispatch(fetchUserById(loginData.id))
//         .unwrap()
//         .catch((err: any) => {
//           enqueueSnackbar(err.message, {
//             variant: "error",
//             preventDuplicate: true,
//           });
//         });
//     }

//     if (userId) {
//       dispatch(fetchUserById(userId))
//         .unwrap()
//         .catch((err: any) => {
//           enqueueSnackbar(err.message, {
//             variant: "error",
//             preventDuplicate: true,
//           });
//         });
//     }
//   }, []);

//   React.useEffect(() => {
//     if (isClient) {
//       router.push("/dashboard/certificates/learner");
//     }
//   }, [isClient]);

//   return (
//     <div>
//       {courseState.allCourses?.length > 0 ? (
//         <div>
//           <h1 className="uppercase text-secondary text-xl font-semibold mb-5 lg:text-left text-center">
//             Find your earned certificates
//           </h1>
//           <div className="flex flex-wrap md:justify-normal justify-center gap-4">
//             {courseState?.allCourses?.map((course) => {
//               return (
//                 <div
//                   key={course.id}
//                   className="xs:w-[350px] w-full aspect-video rounded-lg inset-0 relative"
//                 >
//                   <img
//                     src={course.coverImage}
//                     alt=""
//                     className="w-full h-full rounded-lg"
//                   />
//                   <div className="flex flex-col justify-center w-[80%] max-w-[550px] aspect-[16/7] absolute xxs:top-[50%] top-[60%] left-[50%] -translate-x-2/4 -translate-y-2/4 text-white p-2 z-10 bg-black/65">
//                     <div className="flex flex-col items-center justify-center">
//                       <h1 className="sm:text-lg text-base text-center max-w-[500px] pb-3 border-b line-clamp-2">
//                         {course.title}
//                       </h1>
//                       {}
//                       <Button
//                         variant="contained"
//                         className="bg-secondary/30 hover:bg-secondary/50 w-fit mt-4 !h-[40px]"
//                         onClick={handleOpenModal}
//                       >
//                         add certificate
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <h1 className="uppercase text-secondary text-xl font-semibold mb-5">
//             No courses added yet
//           </h1>
//           <Button
//             variant="contained"
//             className="bg-primary hover:bg-primary/90 w-fit my-4 !h-[46px]"
//             onClick={() => {
//               router.push(`/dashboard/courses`);
//             }}
//           >
//             Add courses
//           </Button>
//         </div>
//       )}{" "}
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         sx={{
//           borderRadius: "30px",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             maxHeight: "98vh",
//             width: {
//               sm: 500,
//               xs: "95%",
//             },
//             maxWidth: 500,
//             overflowY: "auto",
//             bgcolor: "background.paper",
//             border: "none",
//             borderRadius: "10px",
//             boxShadow: 24,
//             p: {
//               md: 4,
//               sm: 2,
//               xs: 1,
//             },
//           }}
//         >
//           <Box className="flex items-center justify-between border-b mb-4">
//             <Typography className="text-2xl font-semibold text-accent">
//               Add certificate to course
//             </Typography>
//             <IconButton onClick={handleCloseModal} size="medium">
//               <MdOutlineClose />
//             </IconButton>
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default AdminCertificates;
