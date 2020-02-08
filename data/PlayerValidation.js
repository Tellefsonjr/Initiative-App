//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const numeric = /^(0|[1-9][0-9]*)$/;

const validation = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(1)
    .max(35),
  className: Yup.string()
    .required("Please select a class."),
  hp: Yup.number()
    .typeError("HP must be a number.")
    .max(100),
  initiativeBonus: Yup.number()
    .typeError("Initiative bonus must be a number.")
    .max(10),
});

export default validation;
