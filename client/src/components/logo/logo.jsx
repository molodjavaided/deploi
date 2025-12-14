import styled from "styled-components";
import LogoSVG from "../../img/logo/scat.svg";
import { Link } from "react-router-dom";

const LogoContainer = ({ className }) => (
  <img
    src={LogoSVG}
    className={className}
    alt="logo"
    width="150px"
    height="150px"
  />
);

export const Logo = styled(LogoContainer)``;
