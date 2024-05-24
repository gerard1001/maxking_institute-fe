import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { pageThumbnailPlugin } from "./idk1";

const thumbnailPluginInstance = thumbnailPlugin();
const { Cover } = thumbnailPluginInstance;

const pageThumbnailPluginInstance = pageThumbnailPlugin({
  PageThumbnail: <Cover getPageIndex={() => 0} />,
});
