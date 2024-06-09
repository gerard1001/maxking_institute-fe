import { ISubject } from "./subject.interface";

export interface ICollaborator {
  id: string;
  name: string;
  image: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCollaborator {
  name: string;
  image: string;
}

export interface CollaboratorSliceState {
  allCollaborators: ICollaborator[];
  collaborator: ICollaborator;
  loading: boolean;
  error: any;
}
