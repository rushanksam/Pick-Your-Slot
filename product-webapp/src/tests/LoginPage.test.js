/*describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toBe(4);
  });
});
*/

import { render, screen, queryByAttribute } from "@testing-library/react";
import LoginPage from "../login-register/Screens/Login/LoginPage";

test("renders email input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<LoginPage />);
  const emailElement = getById(dom.container, "email");
  expect(emailElement).toBeInTheDocument();
});

test("renders password input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<LoginPage />);
  const emailElement = getById(dom.container, "password");
  expect(emailElement).toBeInTheDocument();
});
