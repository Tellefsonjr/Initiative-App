//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const numeric = /^(0|[1-9][0-9]*)$/;
const negaiveNumeric = /^[-+]?\d*$/;

const validation = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(1)
    .max(35),
  race: Yup.string()
    .required("Required")
    .matches(/^(?!.*(default))/, "Please choose a different class."),
  className: Yup.string()
    .required("Required")
    .matches(/^(?!.*(default))/, "Please choose a different class."),
  stats: Yup.object().shape({
    level: Yup.number()
      .required("Required")
      .min(1, "Must be between 1-20")
      .max(20, "Must be between 1-20"),
    ac: Yup.number()
      .required("Required")
      .min(1, "Must be between 1-70")
      .max(70, "Must be between 1-70"),
    maxHp: Yup.number()
      .required("Required")
      .min(1, "Must be between 1-400")
      .max(400, "Must be between 1-400"),
    initiativeBonus: Yup.number()
      .required("Required")
      .min(-10, "Must be between -10-10")
      .max(10),
    abilityScores: Yup.object().shape({
      strength: Yup.number()
        .required("Required")
        .min(1, "Must be between 1-30")
        .max(30),
      dexterity: Yup.number()
        .required("Required")
        .min(1, "Must be between 1-30")
        .max(30, "Must be between 1-30"),
      constitution: Yup.number()
        .required("Required")
        .min(1, "Must be between 1-30")
        .max(30, "Must be between 1-30"),
      intelligence: Yup.number()
        .required("Required")
        .min(1, "Must be between 1-30")
        .max(30, "Must be between 1-30"),
      wisdom: Yup.number()
        .required("Required")
        .min(1, "Must be between 1-30")
        .max(30, "Must be between 1-30"),
      charisma: Yup.number()
        .required("Required")
        .min(1, "Must be between 1-30")
        .max(30, "Must be between 1-30"),
    }),
  }),
});

export default validation;
