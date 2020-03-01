//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;

const validation = Yup.object().shape({
  title: Yup.string()
    .required()
    .max(25),
  campaign: Yup.string()
    .max(25),
  description: Yup.string()
    .max(255),
  party: Yup.object().shape({
    title: Yup.string("Please enter a title for this party below.").max(25),
  }),
  settings: Yup.object().shape({
    autoRoll: Yup.object().shape({
      monsters: Yup.boolean(),
      players: Yup.boolean(),
    })
  })

});

export default validation;
