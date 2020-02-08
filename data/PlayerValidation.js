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
    .matches(/^((?!default).)*$/, "Please select a different option."),
  hp: Yup.number()
    .max(100),
  initiativeBonus: Yup.number()
    .max(10),
});

export default validation;
