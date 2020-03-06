//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;

const validation = Yup.object().shape({
  title: Yup.string()
    .required()
    .max(25),
  players: Yup.array(),
});

export default validation;
