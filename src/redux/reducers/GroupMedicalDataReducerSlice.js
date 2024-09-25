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
    //console.log(property_name, property_value, "quaestion", new_data.questions);
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
const initialState = {
  line_of_business: "GroupMedical",
  insuranceType: "GroupMedical",
  leadid: null,
  name: null,
  phoneno: '',
  age:null,
  email: null,
  call_time:null,
  call_date:null,
  brief_information:"",
  other_insurance_name:null,
  comparelist: [],
  allplans: [],
  nature_of_plan_id: null,
  company_id: null,
  instanpolicy: null,
  repaire_type_name: null,
  minCarValue: null,
  maxCarValue: null,
  loading: false,
  error: false,
  businessTypeId: "",
  aslider_value: 0,
  selectedValues: [],
  additional_id: [],
  businessentitytoken: null,
  oldleadid: null,
  user:"customer",
  price:"Lowest Price",
  updatevehicledetails:false,
  location:window.location.pathname,
  isupdated:false,
};


const storedData = JSON.parse(localStorage.getItem("GroupMedical"));
const mergedInitialState = { ...initialState, ...storedData };
const SetDataToLocaleStorage = (state) => {
  localStorage.setItem("GroupMedical", JSON.stringify({ ...state }));
  return {
    ...state
  }
};

export const GroupMedical = createSlice({
  name: "GroupMedical",
  initialState: mergedInitialState,
  reducers: {
    AddGroupMedical: (state, action) => {
      console.log("payload",action.payload)
      const { name, value } = action.payload;
       
      state[name] = value;

      SetDataToLocaleStorage(state);
      return state
    },
    AddGroupMedicalEstimatedValue: (state, action) => {
      try {
        console.log("action.payload", action.payload)
        const { name, value } = action.payload;
        console.log("name", name)
        console.log("value", value)
        state[name] = value;
      
        return state
      } catch (error) {
        console.log(error)
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
        console.log("action.payload", action.payload)
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
    AddAllGroupMedical: (state, action) => {
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
      //console.log({ data: data });
      // Find the index of the item in state.comparelist
      const indexInCompareList = state.comparelist.findIndex(
        (item) => data?._id === item?._id
      );
      //console.log({ indexInCompareList });
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
          state.homedrivingyear = Homedrivingexpr.year ;
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
  AddGroupMedical,
  AddFilteredGroupMedical,
  AddMotoformFilterData,
  AddAllPlans,
  AddAllGroupMedical,
  fetchDrivingExperience,
  fetchDrivingExperienceSuccess,
  fetchDrivingExperienceError,
  addAdditionalId,
  removeAdditionalId,
  AddMotoformRenewelData,
  AddDataFromLeadid,
  AddGroupMedicalEstimatedValue,
} = GroupMedical.actions;

export default GroupMedical.reducer;