import { ReduxState } from "../../store";

export const selectQuestions = (state: ReduxState) => state.question;
