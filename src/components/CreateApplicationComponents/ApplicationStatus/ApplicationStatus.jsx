import React from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppSelector } from '../../../app/hooks';

const ApplicationStatus = ({ state, handleChange }) => {
  const {
    orderStatuses,
    routerInstallationTypes,
    tariffs,
    superTvChoices,
    discounts,
  } = useAppSelector((state) => state.dataState);

  return (
    <>
      <Autocomplete
        value={state?.orderStatus?.VALUE || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'orderStatus',
              value:
                orderStatuses?.find(
                  (orderStatus) => orderStatus?.VALUE === value
                ) || null,
            },
          });
        }}
        options={orderStatuses?.map((orderStatus) => orderStatus?.VALUE) || []}
        loadingText="Загрузка..."
        renderInput={(params) => (
          <TextField {...params} label="Статус оплаты" />
        )}
      />
      <Autocomplete
        value={state?.routerInstallationType?.VALUE || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'routerInstallationType',
              value:
                routerInstallationTypes?.find(
                  (routerInstallationType) =>
                    routerInstallationType?.VALUE === value
                ) || null,
            },
          });
        }}
        options={
          routerInstallationTypes?.map(
            (routerInstallationType) => routerInstallationType?.VALUE
          ) || []
        }
        loadingText="Загрузка..."
        renderInput={(params) => (
          <TextField {...params} label="Установка роутера" />
        )}
      />
      <Autocomplete
        value={state?.tariff?.VALUE || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'tariff',
              value: tariffs?.find((tariff) => tariff?.VALUE === value) || null,
            },
          });
        }}
        options={tariffs?.map((tariff) => tariff?.VALUE) || []}
        loadingText="Загрузка..."
        renderInput={(params) => <TextField {...params} label="Тариф" />}
      />
      <Autocomplete
        value={state?.superTv?.VALUE || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'superTv',
              value:
                superTvChoices?.find((superTv) => superTv?.VALUE === value) ||
                null,
            },
          });
        }}
        options={superTvChoices?.map((superTv) => superTv?.VALUE) || []}
        loadingText="Загрузка..."
        renderInput={(params) => (
          <TextField {...params} label="Установка SuperTV" />
        )}
      />
      <Autocomplete
        value={state?.discount?.VALUE || ''}
        onChange={(_, value) => {
          handleChange({
            target: {
              name: 'discount',
              value:
                discounts?.find((discount) => discount?.VALUE === value) ||
                null,
            },
          });
        }}
        options={discounts?.map((discount) => discount?.VALUE) || []}
        loadingText="Загрузка..."
        renderInput={(params) => <TextField {...params} label="Акция" />}
      />
      {state?.discount?.VALUE === 'Приведи друга' && (
        <TextField
          label="ЛС друга"
          name="discount_ls"
          value={state?.discount_ls}
          onChange={handleChange}
          variant="outlined"
        />
      )}
    </>
  );
};

export default ApplicationStatus;
