"use client";

import {
  fetchSingleDocument,
  selectDocuments,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";

interface PageProps {
  params: {
    document_id: string;
  };
}

const DocumentPage = ({ params: { document_id } }: PageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const documentState = useSelector(selectDocuments);

  React.useEffect(() => {
    dispatch(fetchSingleDocument(document_id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          enqueueSnackbar(res.message, { variant: "success" });
        } else {
          enqueueSnackbar("Document fetch failed", { variant: "error" });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Document fetch failed", { variant: "error" });
      })
      .finally(() => {
        // router.push("/dashboard/documents");
      });
  }, []);
  return (
    <div>
      <div className="">
        <h1 className="text-2xl text-accent font-bold">
          {documentState.allDocuments && documentState?.document?.title}
        </h1>
        <iframe
          src={documentState?.document?.file}
          allow="autoplay"
          width="100%"
          height="500px"
          className="max-w-fit "
        />
      </div>
    </div>
  );
};

export default DocumentPage;
