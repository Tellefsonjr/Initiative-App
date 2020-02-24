//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const numeric = /^(0|[1-9][0-9]*)$/;

const validation = Yup.object().shape({
  initiative: Yup.number()
    .typeError("Initiative must be a number.")
    .max(20),
});

export default validation;
