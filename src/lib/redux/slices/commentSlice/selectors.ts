import { ReduxState } from "../../store";

export const selectComments = (state: ReduxState) => state.comment;
