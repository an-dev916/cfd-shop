import moment from "moment";

export const localTime = (dateTime) => {
  const editDate = moment(dateTime).format("L").split("/");
  const uploadedDate = `${editDate[1]}/${editDate[0]}/${editDate[2]}`;

  return uploadedDate;
};
