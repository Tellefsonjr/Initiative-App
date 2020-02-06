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
});

export default validation;
