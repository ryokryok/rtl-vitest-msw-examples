import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { render } from "@testing-library/react";

export const setup = (jsx: ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};
