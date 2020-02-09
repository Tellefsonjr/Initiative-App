//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;

const validation = Yup.object().shape({
  title: Yup.string()
    .required()
    .min(1)
    .max(35),
  campaign: Yup.string()
    .max(50),
  description: Yup.string()
    .max(255),
  party: Yup.object().shape({
    title: Yup.string("Please enter a title for this party below."),
  }),

});

export default validation;
