import { render, screen, queryByAttribute } from "@testing-library/react";
import TagTeamRegister from "../login-register/Screens/Register/TagTeamRegister";

test("renders name input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<TagTeamRegister />);
  const element = getById(dom.container, "memberName");
  expect(element).toBeInTheDocument();
});

test("renders email input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<TagTeamRegister />);
  const element = getById(dom.container, "teamName");
  expect(element).toBeInTheDocument();
});

test("renders password input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<TagTeamRegister />);
  const element = getById(dom.container, "email");
  expect(element).toBeInTheDocument();
});

test("renders password input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<TagTeamRegister />);
  const element = getById(dom.container, "password");
  expect(element).toBeInTheDocument();
});

test("renders confirm password input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<TagTeamRegister />);
  const element = getById(dom.container, "confirmPassword");
  expect(element).toBeInTheDocument();
});
