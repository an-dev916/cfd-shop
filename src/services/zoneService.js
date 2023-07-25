import instance from "./axiosInstance";

const zone = {
  provinces: "/provinces",
  districts: "/districts",
  wards: "/wards",
};

export const zoneService = {
  getProvinces() {
    return instance.get(zone.provinces);
  },
  getProvinceById(id = "") {
    return instance.get(`${zone.provinces}${id ? "/" + id : ""}`);
  },
  getDistricts(provinceId = "") {
    return instance.get(`${zone.districts}${"?province=" + provinceId}`);
  },
  getDistrictById(id = "") {
    return instance.get(`${zone.districts}${id ? "/" + id : ""}`);
  },
  getWards(districtId = "") {
    return instance.get(`${zone.wards}${"?district=" + districtId}`);
  },
  getWardById(id = "") {
    return instance.get(`${zone.wards}${id ? "/" + id : ""}`);
  },
};
