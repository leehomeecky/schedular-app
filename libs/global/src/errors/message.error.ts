import { schedularError } from './schedular.error';

export const ErrorMessage = {
  ...schedularError,
  INTERNAL_SERVER_ERROR: 'Oops!! internal server error',
};
