import { ReduxState } from "../../store";

export const selectUsers = (state: ReduxState) => state.user;
