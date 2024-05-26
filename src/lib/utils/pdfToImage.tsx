// components/PDFViewer.tsx
import React, { useState } from "react";
import {
  Worker,
  Viewer,
  SpecialZoomLevel,
  ScrollMode,
  ViewMode,
  SetRenderRange,
  VisiblePagesRange,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { pageThumbnailPlugin } from "./idk1";

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;

  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => 0} width={200} />,
  });

  return (
    <div className="">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        children={
          <Viewer
            fileUrl={fileUrl}
            defaultScale={SpecialZoomLevel.PageFit}
            scrollMode={ScrollMode.Vertical}
            viewMode={ViewMode.DualPageWithCover}
            enableSmoothScroll={false}
            initialPage={0}
            plugins={[thumbnailPluginInstance, pageThumbnailPluginInstance]}
          />
        }
      />
      {/* <Viewer
          fileUrl={fileUrl}
          defaultScale={SpecialZoomLevel.ActualSize}
          enableSmoothScroll={false}
          initialPage={1}
          theme="dark"
        />
      </Worker> */}
    </div>
  );
};

export default PDFViewer;
