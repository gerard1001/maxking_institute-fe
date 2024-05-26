import { ReduxState } from "../../store";

export const selectEvents = (state: ReduxState) => state.event;
