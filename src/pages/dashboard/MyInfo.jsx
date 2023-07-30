import { Modal, Select } from "antd";
import axios from "axios";
import produce from "immer";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useQuery from "../../hooks/useQuery";
import { zoneService } from "../../services/zoneService";
import { removeAccents } from "../../utils/format";
// import Select from "../../components/Select";
import useDashboard from "./useDashboard";
import "./style.css";
import cn from "classnames";
import moment from "moment/moment";
import { localTime } from "../../utils/localTime";

const MyInfo = () => {
  // State Zones
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [idProvince, setIdProvince] = useState("");
  const [idDistrict, setIdDistrict] = useState("");
  const [idWard, setIdWard] = useState("");

  // General
  const { onUpdate } = useDashboard();
  const { confirm } = Modal;
  const profile = useSelector((state) => state.auth.profile);
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      province: "",
      // district: "",
      // ward: "",
    },
  });
  console.log("all error :>> ", errors);
  console.log("all zone :>> ", [idProvince, idDistrict, idWard]);
  // const provinceChange = (ev) => {
  //   if (ev.target.value) {
  //     const refDistricts = provinces.find((el) =>
  //       el?.codename?.includes(ev.target.value)
  //     );
  //     setDistricts(refDistricts?.districts);
  //   } else {
  //     setDistricts([]);
  //     setWards([]);
  //   }
  // };

  // const districtChange = (ev) => {
  //   if (ev.target.value) {
  //     const refWards = districts.find((el) =>
  //       el?.codename?.includes(ev.target.value)
  //     );
  //     setWards(refWards?.wards);
  //   } else {
  //     setWards([]);
  //   }
  // };

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
    // Set Data
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

  const onSubmit = (data) => {
    console.log("data", data);
    confirm({
      title: "Update your profile?",
      content: (
        <>
          <p>Please check your information correctly!</p>
        </>
      ),
      onOk() {
        onUpdate(data);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // useEffect(() => {
  //   const testLocation = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://provinces.open-api.vn/api/?depth=3"
  //       );
  //       setProvinces(res?.data);
  //     } catch (error) {
  //       console.log("error :>> ", error);
  //     }
  //   };
  //   testLocation();
  // }, []);

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

  useEffect(() => {
    if (profile) {
      for (const field in profile) {
        // field = key
        if (field === "firstName") {
          setValue(field, profile[field] + " " + (profile?.lastName || ""));
        } else if (field === "birthday") {
          setValue(
            field,
            localTime(profile?.birthday).split("/").reverse().join("-") || ""
          );
        } else {
          setValue(field, profile[field]);
        }
      }
    }
  }, [profile]);

  return (
    <div
      className="tab-pane fade show active"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="account-form">
        <div className="row">
          <div className="col-sm-6">
            <Input
              label="Full Name"
              required
              {...register("firstName", { required: "Please fill in!" })}
              error={errors?.firstName?.message}
            />
          </div>
          <div className="col-sm-6">
            <Input
              label="Email Address"
              required
              disabled
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
          <div className="col-sm-6">
            <Input
              label="Phone Number"
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
          <div className="col-sm-6">
            <Input
              label="Date Of Birth"
              type="date"
              required
              {...register("birthday", {
                required: "DOB is required!",
              })}
              error={errors?.birthday?.message}
            />
          </div>
        </div>
        <div
          className="row"
          // style={{ marginBottom: "20px" }}
        >
          <div className="col-sm-4">
            <label htmlFor="province">Province/ City *</label>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => {
                console.log("province field", field);

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

            {/* <Select
              label="Province/City"
              required
              options={
                provinces?.length > 0 &&
                [{ label: "--", value: "" }].concat(
                  provinces.map((province) => {
                    return {
                      label: province?.name,
                      value: province?.codename,
                    };
                  })
                )
              }
              onChangeValue={provinceChange}
              {...register("province", {
                required: "Please select!",
              })}
              error={errors?.province?.message}
            /> */}
          </div>
          <div className="col-sm-4">
            <label htmlFor="district">District *</label>
            <Controller
              name="district"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => {
                console.log("district field", field);

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

            {/* <Select
              label="District/Town"
              required
              disabled={!districts.length}
              onChangeValue={districtChange}
              options={
                districts?.length > 0 &&
                [{ label: "--", value: "" }].concat(
                  districts.map((district) => {
                    return {
                      label: district?.name,
                      value: district?.codename,
                    };
                  })
                )
              }
              {...register("district", {
                required: "Please select!",
              })}
              error={errors?.district?.message}
            /> */}
          </div>
          <div className="col-sm-4">
            <label htmlFor="ward">Ward *</label>
            <Controller
              name="ward"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => {
                console.log("ward field", field);

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

            {/* <Select
              label="Ward"
              required
              disabled={!wards.length}
              options={
                wards?.length > 0 &&
                [{ label: "--", value: "" }].concat(
                  wards.map((ward) => {
                    return {
                      label: ward?.name,
                      value: ward?.codename,
                    };
                  })
                )
              }
              {...register("ward", {
                required: "Please select!",
              })}
              error={errors?.ward?.message}
            /> */}
          </div>
        </div>
        <Input
          label="Street address"
          required
          {...register("street", {
            required: "Please fill in!",
          })}
          error={errors?.street?.message}
        />
        <Input
          label="Current password (leave blank to leave unchanged)"
          type="password"
          {...register("currPassword")}
          error={errors?.currPassword?.message}
        />

        <Input
          label="New password (leave blank to leave unchanged)"
          type="password"
          {...register("newPassword")}
          error={errors?.newPassword?.message}
        />

        <Input
          label="Confirm new password"
          type="password"
          {...register("confPassword")}
          error={errors?.confPassword?.message}
        />
        <Button variant="outline">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </form>
    </div>
  );
};

export default MyInfo;
