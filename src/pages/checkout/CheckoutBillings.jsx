import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Input from "../../components/Input";
import { zoneService } from "../../services/zoneService";
import cn from "classnames";
import "./style.css";
import { removeAccents } from "../../utils/format";

const CheckoutBillings = ({ form, profile }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [idProvince, setIdProvince] = useState("");
  const [idDistrict, setIdDistrict] = useState("");
  const [idWard, setIdWard] = useState("");

  const getProvince = async () => {
    const res = await zoneService.getProvinces();
    console.log("res province:>> ", res);
    try {
      if (res?.data) {
        const _tempData = res?.data?.data?.provinces?.map((e) => {
          return {
            value: e?.id,
            label: e?.name,
          };
        });
        setProvinces(_tempData);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const getDistrict = async (provinceId) => {
    const res = await zoneService.getDistricts(provinceId);
    console.log("res district:>> ", res);
    try {
      if (res?.data) {
        const _tempData = res?.data?.data?.districts.map((e) => {
          return {
            value: e?.id,
            label: e?.name,
          };
        });
        setDistricts(_tempData);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const getWard = async (districtId) => {
    const res = await zoneService.getWards(districtId);
    console.log("res wards:>> ", res);
    try {
      if (res?.data) {
        const _tempData = res?.data?.data?.wards.map((e) => {
          return {
            value: e?.id,
            label: e?.name,
          };
        });
        setWards(_tempData);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleProvince = (provinceId) => {
    getDistrict(provinceId);
    // Set Id
    setIdProvince(provinceId);
    setIdDistrict();
    setIdWard();
    // Set data
    setWards([]);
  };

  const handleDistrict = (districtId) => {
    getWard(districtId);
    // Set Id
    setIdDistrict(districtId);
    setIdWard();
  };

  const handleWard = (wardId) => {
    setIdWard(wardId);
  };

  const {
    register,
    control,
    formState: { errors },
  } = form || {};

  useEffect(() => {
    if (profile?.province) {
      getProvince();
      getDistrict(profile?.province);
      getWard(profile?.district);
      setIdProvince(profile?.province);
      setIdDistrict(profile?.district);
      setIdWard(profile?.ward);
      return;
    }
    getProvince();
  }, [profile?.province]);
  return (
    <div className="col-lg-9">
      <h2 className="checkout-title">Billing Details</h2>
      <div className="row">
        <div className="col-sm-4">
          {/* <label>Full Name *</label>
          <input type="text" className="form-control" required /> */}
          <Input
            label="Full Name"
            required
            {...register("fullName", { required: "Please fill in!" })}
            error={errors?.fullName?.message}
          />
        </div>
        <div className="col-sm-4">
          {/* <label>Phone number *</label>
          <input type="text" className="form-control input-error" required />
          <p className="form-error">Please fill in this field</p> */}

          <Input
            label="Phone number"
            required
            {...register("phone", {
              required: "Phone is required!",
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                message: "Phone includes 10 numbers!",
              },
            })}
            error={errors?.phone?.message}
          />
        </div>
        <div className="col-sm-4">
          {/* <label>Email address *</label>
          <input type="email" className="form-control" required /> */}
          <Input
            label="Email Address"
            required
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Please type correct email!",
              },
            })}
            error={errors?.email?.message}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          {/* <label>Province/City *</label>
          <div className="select-custom">
            <select
              className="form-control form-select"
              id="city"
              aria-label="Default select example"
            >
              <option selected />
            </select>
          </div> */}
          <label htmlFor="province">Province/ City *</label>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  style={{ width: "100%" }}
                  className={cn("form-control form-select", {
                    "input-error": !!errors?.province,
                  })}
                  value={idProvince || null}
                  showSearch
                  options={provinces}
                  optionFilterProp="children"
                  onChange={(e) => {
                    field.onChange(e);
                    handleProvince(e);
                  }}
                  placeholder="Select your City..."
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input.toLowerCase()))
                  }
                />
              );
            }}
            name="province"
          />
          {!!errors?.province && <p className="form-error">Please Select!</p>}
        </div>
        <div className="col-sm-4">
          {/* <label>District/Town *</label>
          <div className="select-custom">
            <select className="form-control form-select" id="district">
              <option selected />
            </select>
          </div> */}
          <label htmlFor="district">District *</label>
          <Controller
            name="district"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  style={{
                    width: "100%",
                  }}
                  className={cn("form-control form-select", {
                    "input-error": !!errors?.district,
                  })}
                  value={idDistrict || null}
                  optionFilterProp="children"
                  showSearch
                  options={districts}
                  onChange={(e) => {
                    field.onChange(e);
                    handleDistrict(e);
                  }}
                  placeholder="Select your District..."
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input.toLowerCase()))
                  }
                />
              );
            }}
          />
          {!!errors?.district && <p className="form-error">Please Select!</p>}
        </div>
        <div className="col-sm-4">
          {/* <label>Ward *</label>
          <div className="select-custom">
            <select className="form-control form-select" id="ward">
              <option selected />
            </select>
          </div> */}
          <label htmlFor="ward">Ward *</label>
          <Controller
            name="ward"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  style={{ width: "100%" }}
                  className={cn("form-control form-select", {
                    "input-error": !!errors?.ward,
                  })}
                  value={idWard || null}
                  optionFilterProp="children"
                  showSearch
                  options={wards}
                  onChange={(e) => {
                    field.onChange(e);
                    handleWard(e);
                  }}
                  placeholder="Select your Ward..."
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input.toLowerCase()))
                  }
                />
              );
            }}
          />
          {!!errors?.ward && <p className="form-error">Please Select!</p>}
        </div>
      </div>
      {/* <label>Street address *</label>
      <input
        type="text"
        className="form-control input-error"
        placeholder="House number and Street name"
        required
      />
      <p className="form-error">Please fill in this field</p> */}
      <Input
        label="Street address"
        required
        {...register("street", {
          required: "Please fill in!",
        })}
        error={errors?.street?.message}
      />
      {/* <label>Order notes (optional)</label>
      <textarea
        className="form-control"
        cols={30}
        rows={4}
        placeholder="Notes about your order, e.g. special notes for delivery"
        defaultValue={""}
      /> */}
      <Input
        label="Order notes (optional)"
        {...register("note")}
        renderInput={(props) => {
          return (
            <textarea
              {...props}
              className="form-control"
              cols={30}
              rows={4}
              placeholder="Notes about your order, e.g. special notes for delivery"
            />
          );
        }}
      />
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id="checkout-create-acc"
        />
        <label className="custom-control-label" htmlFor="checkout-create-acc">
          Create an account?
        </label>
      </div>
    </div>
  );
};

export default CheckoutBillings;
