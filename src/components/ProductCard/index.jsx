import { Empty, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { PATHS } from "../../constants/pathnames";
import { THUNK_STATUS } from "../../constants/thunkStatus";
import authService from "../../services/authService";
import { orderService } from "../../services/orderService";
import { authActions } from "../../store/reducers/authenReducer";
import { updateCart } from "../../store/reducers/cartReducer";
import { formatCurrency } from "../../utils/format";
import { useAuthen } from "../MainContext";
import "./style.css";

const ImgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c1c1c1;
`;

const ProductCard = ({ product }) => {
  const { slug, rating, images, title, price, id } = product || {};
  const { profile } = useSelector((state) => state.auth);

  const token = localStorage.getItem(LOCAL_STORAGE.token);

  const { onOpenModal } = useAuthen();
  const { cartInfo, updateStatus } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onAddToCart = async () => {
    if (!token) {
      onOpenModal();
    } else if (id && updateStatus !== THUNK_STATUS.pending) {
      try {
        let addPayload = {};
        // Có 2 trường hợp khi update cart
        // 1. Account đó đã từng add sản phẩm (lúc này sẽ có id của cart)
        if (cartInfo.id) {
          const matchIndex = cartInfo.product?.findIndex(
            (product) => product.id === id
          );

          const newProductPayload = cartInfo.product?.map((product) => {
            return product.id;
          });

          const newQuantityPayload = [...cartInfo.quantity];

          // id của sản phẩm đã tổn tại, chỉ cần tăng quantity ở vị trí matchIndex tương ứng
          if (matchIndex > -1) {
            newQuantityPayload[matchIndex] = (
              Number(newQuantityPayload[matchIndex]) + 1
            ).toString();
            console.log("id sp đã tồn tại");
          }

          // id sản phẩm chưa tồn tại trong product list,
          // lúc này chỉ cần push id vào product và '1' hoặc 1 vào quantity tùy theo datatype của API ràng buộc
          else {
            newProductPayload.push(id);
            newQuantityPayload.push("1");
            console.log("id sp chưa tồn tại");
          }

          // Cập nhật lại payload
          addPayload = {
            ...cartInfo,
            product: newProductPayload,
            quantity: newQuantityPayload,
          };
        }

        // 2. Account mới chưa có gì trong cartInfo
        else {
          // payload lúc này sẽ dựa vào các key được required trong api
          addPayload = {
            product: [id],
            quantity: ["1"],
            subTotal: 0,
            total: 0,
            totalProduct: ["string"],
            discount: 0,
            paymentMethod: "string",
          };
        }
        const res = await dispatch(updateCart(addPayload)).unwrap();
        if (res.id) {
          // message.config({
          //   top: 62,
          // });
          message.success("Add To Cart Succesfully!");
        }
      } catch (error) {
        console.log("error", error);
        message.error("Something wrong");
      }
    }
  };

  const handleWishList = async (productID) => {
    if (!token) {
      onOpenModal();
    } else if (productID) {
      try {
        const payload = {
          product: productID,
        };

        if (profile?.id) {
          const matchIndex = profile?.whiteList?.findIndex(
            (item) => item?.id === productID
          );

          if (matchIndex > -1) {
            message.warning("You added this product to wishlist!");
            // const res = await orderService.deleteWhiteList(payload);
            // const removeRes = res?.data?.data;
            // if (removeRes) {
            //   const profileRes = await authService.getProfile();
            //   if (profileRes?.data?.data) {
            //     dispatch(authActions.setProfile(profileRes?.data?.data));
            //     message.success("Removed from Wishlist!");
            //   }
            // }
          } else {
            const res = await orderService.postWhiteList(payload);
            const addRes = res?.data?.data;
            if (addRes) {
              const profileRes = await authService.getProfile();
              if (profileRes?.data?.data) {
                dispatch(authActions.setProfile(profileRes?.data?.data));
                message.success("Added to Wishlist!");
              }
            }
          }
        }
      } catch (error) {
        console.log("error :>> ", error);
        message.error("Something wrong, please try again!");
      }
    }
  };

  return (
    <div className="product product-2">
      <figure className="product-media">
        <Link to={PATHS.PRODUCT + `/${slug}`} style={{ height: 275 }}>
          {images?.length > 0 ? (
            <img
              src={images[0] || ""}
              alt="Product image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              className="product-image"
            />
          ) : (
            <ImgWrap>
              <Empty
                description=""
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className="product-image"
                // width={"100%"}
                // height={"100%"}
                style={{
                  minHeight: "309px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </ImgWrap>
          )}
          {/* <img
            src={images[0] || ""}
            alt="Product image"
            className="product-image"
          /> */}
        </Link>
        <div className="product-action-vertical">
          <a
            onClick={() => handleWishList(id)}
            className="btn-product-icon btn-wishlist btn-expandable"
          >
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={onAddToCart}
          >
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={PATHS.PRODUCT + `/${slug}`}>{title || "No Title"}</Link>
        </h3>
        <div className="product-price"> ${formatCurrency(price) || "0"} </div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: `${(rating || 0) * 20}%` }}
            />
          </div>
          <span className="ratings-text">( 2 Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
