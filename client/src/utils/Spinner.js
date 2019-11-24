import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  position: absolute;
  top: 42%;
  left: 42%;
`;

const Spinner = props => {
  return (
    <SyncLoader
      css={override}
      sizeUnit={"px"}
      size={20}
      color={"#333033"}
      loading={props.loading}
    />
  );
};

export default Spinner;
