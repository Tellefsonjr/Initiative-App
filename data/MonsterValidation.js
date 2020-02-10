//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const numeric = /^(0|[1-9][0-9]*)$/;

const validation = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(1)
    .max(35),
  type: Yup.string()
    .matches(/^(?!.*(default))/, "Please choose a different type."),
  cr: Yup.string()
    .matches(numeric, "Level must be a number.")
    .max(20),
  hp: Yup.number()
    .typeError("HP must be a number.")
    .max(100),
  ac: Yup.number()
    .typeError("Armor Class must be a number.")
    .max(30),
  initiativeBonus: Yup.number()
    .typeError("Initiative bonus must be a number.")
    .max(10),
});

export default validation;
