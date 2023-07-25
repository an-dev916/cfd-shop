import React from "react";
import ReactDOM from "react-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import cn from "classnames";
import { styled } from "styled-components";
import { AUTHEN_TYPES } from "../../constants/authenTypes";
import useAuthenModal from "./useAuthenModal";

const AuthenModalWrap = styled.div`
  display: ${(props) => (props.isAuthenModalOpen ? "block" : "none")};
`;

const AuthenModal = () => {
  const {
    isAuthenModalOpen,
    renderForm,
    setRenderForm,
    onCloseModal,
    ...rest
  } = useAuthenModal();

  if (!isAuthenModalOpen) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <>
      <AuthenModalWrap
        isAuthenModalOpen={isAuthenModalOpen}
        className={cn("modal", { "show fade": isAuthenModalOpen })}
        id="signin-modal"
        role="dialog"
        aria-hidden="true"
        onClick={onCloseModal}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content"
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onCloseModal}
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: renderForm === AUTHEN_TYPES.login,
                        })}
                        id="signin-tab"
                        onClick={() => setRenderForm(AUTHEN_TYPES.login)}
                        role="tab"
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: renderForm === AUTHEN_TYPES.register,
                        })}
                        id="register-tab"
                        onClick={() => setRenderForm(AUTHEN_TYPES.register)}
                        role="tab"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    {/* SIGN INNNNNNNNNNNNNNNNNNNNNNNNNNNNN */}
                    {renderForm === "login" && <LoginForm {...rest} />}

                    {/* REGISTERRRRRRRRRRRRRRRRRRRRRRRRRRRR */}
                    {renderForm === "register" && <RegisterForm {...rest} />}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
      </AuthenModalWrap>
      {isAuthenModalOpen && (
        <div
          style={{ pointerEvents: isAuthenModalOpen ? "initial" : "none" }}
          className={cn("modal-backdrop fade", {
            show: isAuthenModalOpen,
          })}
        ></div>
      )}
    </>,
    document.body
  );
};

export default AuthenModal;
