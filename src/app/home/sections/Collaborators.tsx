"use client";

import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import { FaHandshake, FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import {
  fetchAllCollaborators,
  selectCollaborators,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import LoadinProgress from "@/components/LoadingProgess";

const Collaborators = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState<boolean>(false);

  const collabState = useSelector(selectCollaborators);

  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchAllCollaborators())
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <LoadinProgress />
        </div>
      ) : (
        <>
          {collabState?.allCollaborators &&
            collabState?.allCollaborators?.length > 0 && (
              <div className="lg:p-10 p-2" id="collaborators">
                <SectionTitle
                  title="MEET OUR OUR collaborators"
                  icon={FaHandshake}
                />
                <div className="lg:p-10 p-2 flex items-center flex-wrap lg:gap-4 gap-2">
                  {collabState?.allCollaborators?.map((collab) => {
                    return (
                      <div
                        className="flex flex-col justify-center items-center p-3 flex-wrap rounded-md hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative cursor-pointer hover:scale-110 ease-in transition-all duration-200"
                        key={collab.id}
                      >
                        <a target="_blank" href={collab.url}>
                          <img
                            src={collab.image}
                            className="w-auto h-auto max-w-[180px]"
                          />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}{" "}
        </>
      )}
    </>
  );
};

export default Collaborators;
