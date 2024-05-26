"use client";

import BackIconButton from "@/components/BackIconButton";
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
        <BackIconButton />
        <h1 className="text-3xl font-bold text-secondary-foreground text-center mb-8">
          {documentState.allDocuments && documentState?.document?.title}
        </h1>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-accent font-bold">Book author:</h1>
          <h2 className="font-semibold text-secondary-foreground">
            {documentState.allDocuments && documentState?.document?.authorName}
          </h2>
        </div>
        <iframe
          src={documentState?.document?.file}
          allow="autoplay"
          width="100%"
          height="100"
          className="h-screen"
        />
      </div>
    </div>
  );
};

export default DocumentPage;
