/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WorkWithUs from "./components/WorkWithUs";

describe("WorkWithUs component", () => {
  it("should submit form and redirect to homepage after 3 seconds", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);
    jest.spyOn(global, "setTimeout").mockImplementation((cb) => cb());

    const { getByLabelText, getByText } = render(<WorkWithUs />);

    const nameInput = getByLabelText("Nombre");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const emailInput = getByLabelText("Correo electrónico");
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });

    const submitButton = getByText("Enviar");
    fireEvent.click(submitButton);

    expect(global.setTimeout).toHaveBeenCalledTimes(1);
    expect(global.setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      3000
    );
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("should display success message after form submission", () => {
    const { getByText } = render(<WorkWithUs />);
    const submitButton = getByText("Enviar");
    fireEvent.click(submitButton);

    expect(
      getByText(
        "En breve nuestro equipo lo estará contactando para validar los datos ingresados, esté atento a su buzón de mail"
      )
    ).toBeInTheDocument();
  });
});
