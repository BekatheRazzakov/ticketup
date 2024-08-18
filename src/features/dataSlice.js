import { createSlice } from "@reduxjs/toolkit";
import {
  getApplications,
  getLocationsList,
  getBxSquares,
  getRegions,
  getBxRegions,
  createApplication,
  getNeactivka,
  getZhaloba,
  getDataForNewNeactivkaForm, createNeactivka
} from "./dataThunk";
import { availableTariffs } from "../constants";

const initialState = {
  applications: [],
  regions: [],
  cities: [],
  districts: [],
  streets: [],
  houses: [],
  bxRegions: [],
  bxSquares: [],
  orderStatuses: [],
  tariffs: [],
  superTvChoices: [],
  routerInstallationTypes: [],
  providers: [],
  neactivka: [],
  zhaloba: [],
  neactivkaRegions: [],
  neactivkaDistricts: [],
  neactivkaStatuses: [],
  neactivkaPaymentStatuses: [],
  neactivkaTariffs: [],
  neactivkaReasons: [],
  neactivkaDiscounts: [],
  neactivkaEquipmentsForFix: [],
  applicationRes: null,
  applicationsLoading: false,
  regionsLoading: false,
  citiesLoading: false,
  districtsLoading: false,
  streetsLoading: false,
  housesLoading: false,
  bxRegionsLoading: false,
  bxSquaresLoading: false,
  createApplicationLoading: false,
  neactivkaLoading: false,
  zhalobaLoading: false,
  neactivkaFormDataLoading: false,
  createNeactivkaLoading: false,
  applicationsError: '',
  neactivkaError: '',
  zhalobaError: '',
  createApplicationErrorMessage: '',
  createNeactivkaErrorMessage: '',
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetCreateApplicationErrorMessage: state => {
      state.createApplicationErrorMessage = '';
    },
    resetCreateNeactivkaErrorMessage: state => {
      state.createNeactivkaErrorMessage = '';
    },
    resetApplicationRes: state => {
      state.applicationRes = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApplications.pending, (state) => {
      state.applicationsError = '';
      state.applicationsLoading = true;
    });
    builder.addCase(getApplications.fulfilled, (state, { payload: res }) => {
      state.applicationsLoading = false;
      state.applications = res;
    });
    builder.addCase(getApplications.rejected, (state, { payload: error }) => {
      state.applicationsLoading = false;
      state.applicationsError = error;
    });
    
    builder.addCase(getRegions.pending, (state) => {
      state.regionsLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(getRegions.fulfilled, (state, { payload: res }) => {
      state.regionsLoading = false;
      state.regions = res;
    });
    builder.addCase(getRegions.rejected, (state, { payload: error }) => {
      state.regionsLoading = false;
      state.createApplicationErrorMessage = error;
    });
    
    builder.addCase(getLocationsList.pending, (state) => {
      state.citiesLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(getLocationsList.fulfilled, (state, { payload: res }) => {
      state.citiesLoading = false;
      state[res.addressType] = res.data;
    });
    builder.addCase(getLocationsList.rejected, (state, { payload: error }) => {
      state.citiesLoading = false;
      state.createApplicationErrorMessage = error;
    });
    
    builder.addCase(getBxRegions.pending, (state) => {
      state.bxRegionsLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(getBxRegions.fulfilled, (state, { payload: res }) => {
      state.bxRegionsLoading = false;
      state.bxRegions = res[0];
      state.orderStatuses = res[3]?.slice(0, 2);
      state.routerInstallationTypes = res[2];
      state.tariffs = res[1]?.filter(tariff => availableTariffs.includes(tariff?.VALUE));
      state.superTvChoices = res[5];
      state.providers = res[4];
    });
    builder.addCase(getBxRegions.rejected, (state, { payload: error }) => {
      state.bxRegionsLoading = false;
      state.createApplicationErrorMessage = error;
    });
    
    builder.addCase(getBxSquares.pending, (state) => {
      state.bxSquaresLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(getBxSquares.fulfilled, (state, { payload: res }) => {
      state.bxSquaresLoading = false;
      state.bxSquares = res;
    });
    builder.addCase(getBxSquares.rejected, (state, { payload: error }) => {
      state.bxSquaresLoading = false;
      state.createApplicationErrorMessage = error;
    });
    
    builder.addCase(createApplication.pending, (state) => {
      state.createApplicationLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(createApplication.fulfilled, (state, { payload: res }) => {
      state.createApplicationLoading = false;
      state.applicationRes = res;
    });
    builder.addCase(createApplication.rejected, (state, { payload: error }) => {
      state.createApplicationLoading = false;
      state.createApplicationErrorMessage = error;
    });
    
    builder.addCase(getNeactivka.pending, (state) => {
      state.neactivkaLoading = true;
      state.neactivkaError = '';
    });
    builder.addCase(getNeactivka.fulfilled, (state, { payload: res }) => {
      state.neactivkaLoading = false;
      state.neactivka = res;
    });
    builder.addCase(getNeactivka.rejected, (state, { payload: error }) => {
      state.neactivkaLoading = false;
      state.neactivkaError = error;
    });
    
    builder.addCase(getZhaloba.pending, (state) => {
      state.zhalobaLoading = true;
      state.zhalobaError = '';
    });
    builder.addCase(getZhaloba.fulfilled, (state, { payload: res }) => {
      state.zhalobaLoading = false;
      state.zhaloba = res;
    });
    builder.addCase(getZhaloba.rejected, (state, { payload: error }) => {
      state.zhalobaLoading = false;
      state.zhalobaError = error;
    });
    
    builder.addCase(getDataForNewNeactivkaForm.pending, (state) => {
      state.neactivkaFormDataLoading = true;
      state.createNeactivkaErrorMessage = '';
    });
    builder.addCase(getDataForNewNeactivkaForm.fulfilled, (state, { payload: res }) => {
      state.neactivkaFormDataLoading = false;
      state.neactivkaDistricts = res[0];
      state.neactivkaRegions = res[1];
      state.neactivkaStatuses = res[2];
      state.neactivkaPaymentStatuses = res[3];
      state.neactivkaTariffs = res[4];
      state.neactivkaReasons = res[5];
      state.neactivkaDiscounts = res[6];
      state.neactivkaEquipmentsForFix = res[7];
    });
    builder.addCase(getDataForNewNeactivkaForm.rejected, (state, { payload: error }) => {
      state.neactivkaFormDataLoading = false;
      state.createNeactivkaErrorMessage = error;
    });
    
    builder.addCase(createNeactivka.pending, (state) => {
      state.createNeactivkaLoading = true;
      state.createNeactivkaErrorMessage = '';
    });
    builder.addCase(createNeactivka.fulfilled, (state) => {
      state.createNeactivkaLoading = false;
    });
    builder.addCase(createNeactivka.rejected, (state, { payload: error }) => {
      state.createNeactivkaLoading = false;
      state.createNeactivkaErrorMessage = error;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  resetApplicationRes,
  resetCreateApplicationErrorMessage,
  resetCreateNeactivkaErrorMessage,
} = DataSlice.actions;
