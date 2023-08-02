import { message } from "antd";
import cn from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { subscribeService } from "../../services/subscribeService";

const ContactForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      if (data?.email) {
        const payload = {
          name: data?.name || "",
          title: data?.title || "",
          email: data?.email || "",
          description: data?.description || "",
          phone: data?.phone || "",
        };
        const res = await subscribeService.subscribe(payload);
        console.log("res :>> ", res);
        if (res?.data?.data) {
          message.success("Succesfully!");
        }
      }

      console.log("data :>> ", data);
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Failed Submit. Please try again!");
    }
  };
  console.log("errors :>> ", errors);

  return (
    <div className="col-lg-6">
      <h2 className="title mb-1">Got Any Questions?</h2>
      <p className="mb-2">
        Use the form below to get in touch with the sales team
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form mb-3">
        <div className="row">
          <div className="col-sm-6">
            <Input
              placeholder="Name *"
              {...register("name", { required: "Please fill in this field!" })}
              error={errors?.name?.message}
            />

            {/* <label htmlFor="cname" className="sr-only">
              Name
            </label>
            <input
              type="text"
              className="form-control input-error"
              id="cname"
              placeholder="Name *"
              required
            />
            <p className="form-error">Please fill in this field</p> */}
          </div>
          <div className="col-sm-6">
            <Input
              placeholder="Email *"
              {...register("email", {
                required: "Please fill in this field!",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please type correct email!",
                },
              })}
              error={errors?.email?.message}
            />
            {/* <label htmlFor="cemail" className="sr-only">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="cemail"
              placeholder="Email *"
              required
            /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input
              placeholder="Phone *"
              {...register("phone", {
                required: "Please fill in this field!",
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Phone includes 10 numbers!",
                },
              })}
              error={errors?.phone?.message}
            />
            {/* <label htmlFor="cphone" className="sr-only">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="cphone"
              placeholder="Phone"
            /> */}
          </div>
          <div className="col-sm-6">
            <Input
              placeholder="Subject"
              {...register("title")}
              error={errors?.title?.message}
            />
            {/* <label htmlFor="csubject" className="sr-only">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="csubject"
              placeholder="Subject"
            /> */}
          </div>
        </div>
        <Input
          placeholder="Message *"
          {...register("description", {
            required: "Please fill in this field!",
          })}
          error={errors?.description?.message}
          renderInput={(props) => {
            return (
              <>
                <textarea
                  {...props}
                  className={cn("form-control", {
                    "input-error": errors?.description?.message,
                  })}
                  // placeholder="Notes about your order, e.g. special notes for delivery"
                />
              </>
            );
          }}
        />
        {/* <label htmlFor="cmessage" className="sr-only">
          Message
        </label>
        <textarea
          className="form-control"
          cols={30}
          rows={4}
          id="cmessage"
          required
          placeholder="Message *"
          defaultValue={""}
        /> */}
        <button
          type="submit"
          className="btn btn-outline-primary-2 btn-minwidth-sm"
        >
          <span>SUBMIT</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
