import { render, screen, queryByAttribute } from "@testing-library/react";
import InterviewerRegister from "../login-register/Screens/Register/InterviewerRegister";

let tracksList = [
  { id: 0, name: "Select option" },
  { id: 1, name: "Java backend" },
  { id: 2, name: "Javascript full stack" },
  { id: 3, name: "QA Automation" },
];

const rootElement = document.getElementById("root");

test("renders name input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<InterviewerRegister tracksList={tracksList} />);
  const element = getById(dom.container, "name");
  expect(element).toBeInTheDocument();
});

test("renders email input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<InterviewerRegister tracksList={tracksList} />);
  const element = getById(dom.container, "email");
  expect(element).toBeInTheDocument();
});

test("renders password input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<InterviewerRegister tracksList={tracksList} />);
  const element = getById(dom.container, "password");
  expect(element).toBeInTheDocument();
});

test("renders confirm password input element", () => {
  const getById = queryByAttribute.bind(null, "id");
  const dom = render(<InterviewerRegister tracksList={tracksList} />);
  const element = getById(dom.container, "confirmPassword");
  expect(element).toBeInTheDocument();
});
