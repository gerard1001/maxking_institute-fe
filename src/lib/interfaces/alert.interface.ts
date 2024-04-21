export const ALERT = "ALERT";

export interface IAlertType {
  type: typeof ALERT;
  payload: IAlert;
}

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}
