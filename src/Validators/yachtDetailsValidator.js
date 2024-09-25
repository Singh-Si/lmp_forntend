import Joi from "joi"
export function YachtDetailsValidation(data) {
  console.log("yacht_type_of_use", data.yacht_type_of_use)
  const schema = Joi.object({
    boat_name: Joi.string().allow(null).required().label("Boat Name").messages({ "string.empty": "Please Enter Boat Name" }),
    boat_registration_no: Joi.string().allow(null).optional().allow("").label("Boat Registration No").messages({ "string.empty": "Please Enter Boat Registration No" }),
    boat_hull_serial_number: Joi.string().allow(null).label("Hull Serial Number").messages({ "any.required": "Please Enter Hull Serial Number", "string.empty": "Please Enter Hull Serial Number" }),
    boat_hull_material: Joi.string().allow(null).required().label("Boat Hull Material").messages({ "string.empty": "Please Enter Boat Hull Material" }),
    boat_length_in_meter: Joi.string().allow(null).required().label("Boat Lenngth").messages({ "any.required": "Please Enter Boat Lenngth", "string.empty": "Please Enter Boat Lenngth" }),
    boat_breath_in_meter: Joi.string().allow(null).required().label("Boat Breath").messages({ "any.required": "Please Enter Boat Breath", "string.empty": "Please Enter Boat Breath" }),
    no_of_passengers: Joi.string().allow(null).required().label("No of Passengers").messages({ "string.empty": "Please Enter No of Passengers" }),
    yacht_type_of_use: Joi.string().allow(null).required().label("Type Of Use").messages({ "string.empty": "Please Select Type Of Use" }),
    current_policy_status: Joi.string().allow(null).required().label("Current Policy Status").messages({ "string.empty": "Please Select Current Policy Status" }),
    //   SendersEmail:Joi.string().allow(null).allow("").email({ tlds: { allow: false } }).label("Email"),
  }).unknown(true)
  let result = schema.validate(data)
  if (result.error) {
    // Handle the validation error here, e.g., log or return an error response.
    console.error(result.error.details);
  }
  return schema.validate(data)

}

export function EnginedetailsValidation(data) {
  const schema = Joi.object({
    engine_maker: Joi.string().allow(null).required().label("Engine Maker").messages({ "string.empty": "Please Enter Engine Maker" }),
    engine_seriel_number: Joi.string().allow(null).required().label("Engine Serial Number").messages({ "string.empty": "Please Enter Engine Serial Number" }),
    engine_model_year: Joi.string().allow(null).required().label("engine Model Year").messages({ "string.empty": "Please Enter engine Model Year" }),
    engine_horsepower: Joi.string().allow(null).required().label("Engine Horsepower").messages({ "string.empty": "Please Enter Engine Horsepower" }),
    engine_speed: Joi.string().allow(null).required().label("Engine Speed").messages({ "string.empty": "Please Enter Engine Speed" }),
    engine_type: Joi.string().allow(null).required().label("Engine Type").messages({ "string.empty": "Please Enter Engine Type" }),

    //   SendersEmail:Joi.string().allow(null).allow("").email({ tlds: { allow: false } }).label("Email"),
  }).unknown(true)

  return schema.validate(data)
}
export function SuminsuredValidation(data) {
  const schema = Joi.object({
    sum_insured_hull_equipment_value: Joi.custom((value, helpers) => {
      console.log("N>>>", value)
      if (value === '' || value === null) {
        return helpers.error('any.required', { message: 'Please Enter Hull & Equipment Value' });
      } else
        if (isNaN(value)) {
          return helpers.error('number.base', { message: 'Please Enter a Valid Number' });
        }

      return value;
    })
      .required()
      .label("Hull & Equipment Value"),
  }).unknown(true);

  return schema.validate(data);
}

export function ClaimExperienceValidation(data) {

  const schema = Joi.object({
    // yatchClaimsExperience: Joi.object().required().label("Claim Experience").messages({ "string.empty": "Please Enter Claim Experience" }),
    // yatchInsurancePremium: Joi.boolean().required().label("yatchInsurancePremium").messages({ "string.empty": "Please Select Insurance Premium" }),
    // yatchClaimsExperience1: Joi.object().required().label("Operator’s Experience").messages({ "string.empty": "Please Enter Operator’s Experience" }),
    yatchSailingQualification: Joi.boolean().required().label("Sailing Qualification").messages({ "string.empty": "Please Select Sailing Qualification" }),
    yatchProfessinalEmplaoyed: Joi.boolean().required().label("Professinal Emplaoyed").messages({ "string.empty": "Please Select Professinal Emplaoyed" }),
  }).unknown(true)

  return schema.validate(data)
}
export function model_yearValidation(data) {
  const schema = Joi.object({
    model_year: Joi.string().allow(null).required().label("Model Year").meessages({ "string.empty": "Please Enter Model Year" }),
  }).unknown(true)

  return schema.validate(data)
}

export function UpdateYachtDetailsValidation(data) {
  const schema = Joi.object({
    estimatedsum_insured_hull_equipment_value: Joi.number().allow(null).required().label("Hull & Equipment Value").messages({ "any.required": "Please Enter Hull & Equipment Value" }),
    estimatedno_of_passengers: Joi.string().allow(null).required().label("No Of Passengers").messages({ "string.empty": "Please Enter No Of Passengers" }),
    estimatedboat_name: Joi.string().allow(null).required().label("Boat Name").messages({ "string.empty": "Please Enter Boat Name" }),
    estimatedboat_hull_material: Joi.string().allow(null).required().label("Boat Hull Material").messages({ "string.empty": "Please Enter Boat Hull Material" }),
    estimatedboat_length_in_meter: Joi.string().allow(null).required().label("Boat Lenngth").messages({ "string.empty": "Please Enter Boat Lenngth" }),
    estimatedboat_breath_in_meter: Joi.string().allow(null).required().label("Boat Breath").messages({ "string.empty": "Please Enter Boat Breath" }),
    estimatedYachtMaker: Joi.string().allow(null).required().label("Yacht Maker").messages({ "string.empty": "Please Select Yacht Maker" }),
    estimatedYachtVarient: Joi.string().allow(null).required().label("Yacht Model").messages({ "string.empty": "Please Select Yacht Model" }),
  }).unknown(true)
  let result = schema.validate(data)
  if (result.error) {
    // Handle the validation error here, e.g., log or return an error response.
    console.error(result.error.details);
  }
  return schema.validate(data)

}