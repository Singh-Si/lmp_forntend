import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

// Define initial state
export const searchValue = (property_name, property_value, array) => {
  try {
    let new_data;
    for (let i = 0; i < array.length; i++) {
      if (array[i][property_name] === property_value) {
        new_data = array[i];
      }
    }
    ////console.log(property_name, property_value, "quaestion", new_data.questions);
    return { questions: new_data.questions, year: new_data.year };
  } catch (error) {
    return null;
  }
};
const date = new Date();
let month = date.getMonth();
let currentyear = date.getFullYear();
if (month >= 5) {
  currentyear = currentyear + 1;
}
export const yachtinitialState = {
  boat_name: "",
  estimatedboat_name: null,
  boat_registration_no: null,
  estimatedboat_registration_no: null,
  boat_hull_material: "",
  estimatedboat_hull_material: "",
  boat_length_in_meter: "",
  estimatedboat_length_in_meter: "",
  boat_breath_in_meter: "",
  estimatedboat_breath_in_meter: "",
  no_of_passengers: "",
  estimatedno_of_passengers: "",
  place_of__mooring: "",
  estimatedplace_of__mooring: "",
  yacht_type_of_use: "",
  estimatedyacht_type_of_use: "",
  current_policy_status: "",
  estimatedcurrent_policy_status: "",
  buying_used_boat: false,
  bot_brand_new: true,
  bot_current_renewal: false,
  bot_current_insurance_company_id: "",
  bot_current_renewal: "",
  model_year: "",
  estimatedmodel_year: "",
  YachtMaker: "",
  estimatedYachtMaker: "",
  YachtVarient: "",
  estimatedYachtVarient: "",
  name: "",
  estimatedname: "",
  date_of_birth: "",
  estimateddate_of_birth: "",
  email: null,
  phoneno: null,
  estimatedphoneno: null,
  territoryCoverage: [],
  isselecctcontactterms: false,
  line_of_business: "Yacht",
  insuranceType: "Yacht",
  leadid: null,
  comparelist: [],
  allplans: [],
  nature_of_plan_id: null,
  company_id: null,
  instanpolicy: null,
  repaire_type_name: null,
  loading: false,
  error: false,
  businessTypeId: "",
  aslider_value: 0,
  selectedValues: [],
  additional_id: [],
  businessentitytoken: null,
  oldleadid: null,
  user: "customer",
  price: "Lowest Price",
  updatevehicledetails: false,
  location: window.location.pathname.replace("/", ""),
  isupdated: Date.now(),
  // option1: null,
  // reg_no: null,
  boat_hull_serial_number: "",
  // option2: null,
  // length: null,
  // breadth: null,
  // option3: null,
  // option4: null,
  // full_name: null,
  // date: null,
  // insurance_type: "Yacht",
  // maker: null,
  // option5: null,
  // horsepower: null,
  // speed: null,
  // option6: null,
  // hull_equipment_value: null,
  // dinghy: null,
  // outboard: null,
  // personal_effect_cash: null,
  // trailer: null,
  // option7: null,
  // craft_kept: null,
  // option8: null,
  // option9: null,
  // option10: null,
  // option11: null,
  // claim_years1: null,
  // condition1: null,
  // claim_years2: null,
  // condition2: null,
  // condition3: null,
  plan_category_id: null,
  insurance_company_id: null,
  nature_id: null,
  // sum_insured_trailer: null,
  // sum_insured_personal_effect_including_cash: null,
  // sum_insured_out_board: null,
  // sum_insured_dinghy_tender: null,
  // sum_insured_hull_equipment_value: null,
  yatchClaimsExperience: 0,
  yatchInsurancePremium: false,
  yatchClaimsExperienceQuestions: [],
  YachtOperaterExperienceQuestions: [],
  yatchClaimsExperience1: { min: 0, max: 6 },
  yatchSailingQualification: false,
  yatchProfessinalEmplaoyed: false,
  // engine_seriel_number: "",

  // estimatedoption1: null,
  // estimatedreg_no: null,
  // estimatedboat_hull_serial_number: null,
  // estimatedoption2: null,
  // estimatedlength: null,
  // estimatedbreadth: null,
  // estimatedoption3: null,
  // estimatedoption4: null,
  // estimatedfull_name: null,
  // estimatedemail: null,
  // estimateddate: null,
  // estimatedinsurance_type: "Yacht",
  // estimatedmaker: null,
  // estimatedoption5: null,
  // estimatedhorsepower: null,
  // estimatedspeed: null,
  // estimatedoption6: null,
  // estimatedhull_equipment_value: null,
  // estimateddinghy: null,
  // estimatedoutboard: null,
  // estimatedpersonal_effect_cash: null,
  // estimatedtrailer: null,
  // estimatedoption7: null,
  // estimatedcraft_kept: null,
  // estimatedoption8: null,
  // estimatedoption9: null,
  // estimatedoption10: null,
  // estimatedoption11: null,
  // estimatedclaim_years1: null,
  // estimatedcondition1: null,
  // estimatedclaim_years2: null,
  // estimatedcondition2: null,
  // estimatedcondition3: null,
  // estimatedplan_category_id: null,
  // estimatedinsurance_company_id: null,
  // estimatednature_id: null,
  // estimatedsum_insured_trailer: null,
  // estimatedsum_insured_personal_effect_including_cash: null,
  // estimatedsum_insured_out_board: null,
  // estimatedsum_insured_dinghy_tender: null,
  // estimatedsum_insured_hull_equipment_value: null,
  // estimatedyatchClaimsExperience: 0,
  // estimatedyatchInsurancePremium: false,
  // estimatedyatchClaimsExperience1: 0,
  // estimatedyatchSailingQualification: false,
  // estimatedyatchProfessinalEmplaoyed: false,
  // estimatedengine_seriel_number: "",
  coupon_code: '',
  discountvalue: null,
  coupon_code_data: null,
  hullId: '',
  boat_breath_in_meter_id: '',
  policyTypeId:'',
  engineId:'',
  typeOfUseId:'',

};


const storedData = JSON.parse(localStorage.getItem("Yacht"));
const mergedInitialState = { ...yachtinitialState, ...storedData };
const SetDataToLocaleStorage = (state) => {
  localStorage.setItem("Yacht", JSON.stringify({ ...state }));
  return {
    ...state
  }
};

export const Yacht = createSlice({
  name: "Yacht",
  initialState: mergedInitialState,
  reducers: {
    AddYacht: (state, action) => {

      //console.log("payload",action.payload)
      const { name, value } = action.payload;
      state[name] = value;

      SetDataToLocaleStorage(state);
      return state
    },
    AddYacht: (state, action) => {

      const { name, value } = action.payload;
      if (name == "yatchClaimsExperienceQuestions") {
        let arr = state.yatchClaimsExperienceQuestions
        const existingIndex = arr.findIndex((item) => item._id === value.id);
        console.log("existingIndex", existingIndex)
        // If the _id exists, update the existing entry; otherwise, add a new entry
        if (existingIndex !== -1) {
          arr[existingIndex].value = value.bool; // Update the existing entry's value
        }
        state[name] = arr;
        SetDataToLocaleStorage(state);
        return state
      } else if (name == "YachtOperaterExperienceQuestions") {
        let arr = state.YachtOperaterExperienceQuestions
        const existingIndex = arr.findIndex((item) => item._id === value.id);
        console.log("existingIndex", existingIndex)
        // If the _id exists, update the existing entry; otherwise, add a new entry
        if (existingIndex !== -1) {
          arr[existingIndex].value = value.bool; // Update the existing entry's value
        }
        state[name] = arr;
        SetDataToLocaleStorage(state);
        return state
      }
      else if (name == "yatchClaimsExperienceQuestionsdata") {
        state["yatchClaimsExperienceQuestions"] = value;
        SetDataToLocaleStorage(state);
        return state
      }
      else if (name == "YachtOperaterExperienceQuestionsdata") {
        state["YachtOperaterExperienceQuestions"] = value;
        SetDataToLocaleStorage(state);
        return state
      }
      else {
        state[name] = value;
        SetDataToLocaleStorage(state);
        return state
      }

    },
    AddYachtEngineDetails: (state, action) => {
      const { name, value } = action.payload;
      state["boat_engine_details"][name] = value;
      SetDataToLocaleStorage(state);
      return state
    },
    AddEstimatedYachtEngineDetails: (state, action) => {
      const { name, value } = action.payload;
      state["boat_engine_details"]["estimated" + name] = value;
      SetDataToLocaleStorage(state);
      return state
    },
    AddYachtEstimatedValue: (state, action) => {
      try {
        //console.log("action.payload", action.payload)
        const { name, value } = action.payload;
        //console.log("name", name)
        //console.log("value", value)
        state[name] = value;
        SetDataToLocaleStorage(state);
        return state
      } catch (error) {
        //console.log(error)
      }
    },
    addAdditionalId: (state, action) => {
      const newAdditionalId = action.payload;

      // Check if the value is not already in the array before adding it
      if (!state.additional_id.includes(newAdditionalId)) {
        state.additional_id = [...state.additional_id, newAdditionalId];
        return SetDataToLocaleStorage(state); // Update local storage with the new array
      } else {
        return SetDataToLocaleStorage(state); // Update local storage with the new array
      }
    },
    AddMotoformRenewelData: (state, action) => {
      if (action.payload) {
        //console.log("action.payload", action.payload)
        state = {
          ...state,
          ...action.payload,
        };
      }
      SetDataToLocaleStorage(state);
      return state;
    },

    removeAdditionalId: (state, action) => {
      state.additional_id = state.additional_id.filter(
        (id) => id !== action.payload
      );

      SetDataToLocaleStorage(state);
    },
    AddSelectedCovers: (state, action) => {
      const { id, data } = action.payload;
      state["selectedcovers"]["id"] = id;
      state["selectedcovers"]["data"] = data;
      SetDataToLocaleStorage(state);
    },
    AddMotoformFilterData: (state, action) => {
      if (action.payload.updatedFormData) {
        state = {
          ...state,
          ...action.payload.updatedFormData,
        };
      }
      SetDataToLocaleStorage(state);
      return state;
    },
    AddAllYacht: (state, action) => {
      if (action.payload) {
        state = {
          ...state,
          allplans: action.payload,
        };
      }
      SetDataToLocaleStorage(state);
    },
    AddDataFromLeadid: (state, action) => {
      if (action.payload) {
        state = {
          ...state,
          ...action.payload,
        };
      }
      SetDataToLocaleStorage(state);
    },
    AddToComapre: (state, action) => {
      const data = action.payload.data;
      // Check if the data already exists in state.comparelist or state.allplans
      const existsInCompareList = state.comparelist.some(
        (item) => data?._id === item?._id
      );
      if (existsInCompareList) {
        SetDataToLocaleStorage(state);
        return state; // If the data already exists, do not add it again
      } else {
        state.comparelist.push(data);
        // Remove the item from allplans if it exists
        const indexInAllPlans = state.allplans.findIndex(
          (item) => data?._id === item?._id
        );
        if (indexInAllPlans !== -1) {
          state.allplans.splice(indexInAllPlans, 1);
        }
        SetDataToLocaleStorage(state);
        return state;
      }
    },
    DeleteFromComapre: (state, action) => {
      const data = action.payload.data;
      ////console.log({ data: data });
      // Find the index of the item in state.comparelist
      const indexInCompareList = state.comparelist.findIndex(
        (item) => data?._id === item?._id
      );
      ////console.log({ indexInCompareList });
      if (indexInCompareList !== -1) {
        const itemToRemove = state.comparelist.splice(indexInCompareList, 1)[0];
        // Add the item back to allplans
        state.allplans.push(itemToRemove);
      }

      SetDataToLocaleStorage(state);
      return state;
    },
    DeleteAllFromComapre: (state) => {
      state.comparelist = [];
      state.allplans = [];
      SetDataToLocaleStorage(state);
      return state;
    },
    AddAllPlans: (state, action) => {
      state.comparelist = [];
      state.allplans = action.payload;
      SetDataToLocaleStorage(state);
      return state;
    },
    fetchDrivingExperience(state, action) {
      state.loading = true;
    },
    fetchDrivingExperienceSuccess(state, action) {
      state.loading = false;
      state.error = false;
      // set all
      // set all questions and answers
      if (action.payload.length > 0) {
        // Set UAE Driving questions
        const Uaedrivingexpr = searchValue(
          "_id",
          state.uaedrivingquestion_id,
          action.payload
        );
        if (Uaedrivingexpr) {
          state.uaedrivingquestion = Uaedrivingexpr.questions;
          state.uaedrivingyear = Uaedrivingexpr.year;
        }
        // Set Home Driving questions
        const Homedrivingexpr = searchValue(
          "_id",
          state.homedrivingquestion_id,
          action.payload
        );
        if (Homedrivingexpr) {
          state.homedrivingquestion = Homedrivingexpr.questions;
          state.homedrivingyear = Homedrivingexpr.year;
        }
        // Set Last Year  questions
        const last_year_claim = searchValue(
          "_id",
          state.last_year_claim_question_id,
          action.payload
        );
        if (last_year_claim) {
          state.last_year_claim_question = last_year_claim.questions;
          state.last_year_claim_year = last_year_claim.year;
        }
        const last_year_claim_certificate = searchValue(
          "_id",
          state.last_year_claim_certificate_question_id,
          action.payload
        );
        if (last_year_claim_certificate) {
          state.last_year_claim_certificate_question =
            last_year_claim_certificate.questions;
          state.last_year_claim_certificate_year =
            last_year_claim_certificate.year;
        }
        SetDataToLocaleStorage(state);
        return state;
      }
    },
    fetchDrivingExperienceError(state) {
      state.loading = false;
      state.error = true;
      SetDataToLocaleStorage(state);
      return state;
    },
    AddSelectedPlans: (state, action) => {
      state.selectedplans = action.payload;
      SetDataToLocaleStorage(state);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  AddToComapre,
  AddSelectedPlans,
  DeleteFromComapre,
  DeleteAllFromComapre,
  AddYacht,
  AddFilteredYacht,
  AddMotoformFilterData,
  AddAllPlans,
  AddAllYacht,
  fetchDrivingExperience,
  fetchDrivingExperienceSuccess,
  fetchDrivingExperienceError,
  addAdditionalId,
  removeAdditionalId,
  AddMotoformRenewelData,
  AddDataFromLeadid,
  AddYachtEstimatedValue,
  AddYachtEngineDetails,
  AddEstimatedYachtEngineDetails
} = Yacht.actions;

export default Yacht.reducer;