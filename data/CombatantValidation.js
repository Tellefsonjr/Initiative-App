//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const numeric = /^(0|[1-9][0-9]*)$/;

const validation = Yup.object().shape({
  initiative: Yup.number()
    .typeError("Initiative must be a number.")
    .min(1)
    .max(30),
  cId: Yup.string(),
  refId: Yup.string(),
  name: Yup.string(),
  avatar: Yup.string(),
  className: Yup.string(),
  cr: Yup.string(),
  cType: Yup.string(),
  type: Yup.string(),
  stats: Yup.object().shape({
    abilityScoreBonus: Yup.object(),
    abilityScores: Yup.object(),
    ac: Yup.number(),
    initiativeBonus: Yup.number(),
    skills: Yup.object(),
    hp: Yup.number()
      .max(400)
      .min(0),
    maxHp: Yup.number()
      .max(400)
      .min(0),
    deathSaves: Yup.object(),
  })
});

export default validation;
