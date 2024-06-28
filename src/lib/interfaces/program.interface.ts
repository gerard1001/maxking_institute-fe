export interface ProgramSliceState {
  programs: Program[];
  singleProgram: Program;
  loading: boolean;
  error: any;
}

export interface Program {
  id: string;
  coverImage: string;
  title: string;
  short: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
