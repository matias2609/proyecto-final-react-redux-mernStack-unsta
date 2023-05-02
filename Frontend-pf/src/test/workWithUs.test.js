/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WorkWithUs from "../components/WorkWithUs";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("WorkWithUs component", () => {
  it("should submit form and redirect to homepage after 3 seconds", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);
    jest.spyOn(global, "setTimeout").mockImplementation((cb) => cb());

    const { getByText } = render(
      <BrowserRouter>
        <WorkWithUs />
      </BrowserRouter>
    );

    const submitButton = getByText("Enviar");
    fireEvent.click(submitButton);

    expect(global.setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      3000
    );
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("should display success message after form submission", () => {
    const { getByText } = render(
      <BrowserRouter>
        <WorkWithUs />
      </BrowserRouter>
    );
    const submitButton = getByText("Enviar");
    fireEvent.click(submitButton);

    expect(
      getByText(
        "En breve nuestro equipo lo estará contactando para validar los datos ingresados, esté atento a su buzón de mail"
      )
    ).toBeInTheDocument();
  });
});
