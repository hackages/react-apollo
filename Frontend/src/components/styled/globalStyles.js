import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import Background from '../../assets/img/background-1.svg'
import SecondBackground from '../../assets/img/background-2.svg'
import RegisterBgUp from '../../assets/img/register-1.svg'
import RegisterBgDown from '../../assets/img/register-3.svg'
import RegisterBgUpMobile from '../../assets/img/register-mobile-1.svg'
import RegisterBgDownMobile from '../../assets/img/register-mobile-2.svg'
import BeerBg from '../../assets/img/beer-bg.svg'

export const StyledLink = styled(Link)`
  color: #fda085;
  font-size: 1em;
  text-decoration: none;
`

export const ImageContainer = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display: ${props => (props.checkin ? 'block' : 'inline-block')};
  padding: 8px;
  position: ${props => (props.checkin ? 'static' : 'absolute')};
  top: -50px;
  box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.13);
  border: 3px solid white;
  background: url(${BeerBg});
  background-size: cover;
  div {
    width: 100%;
    height: 100%;
  }
`
export const BeerContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  height: auto;
  text-align: center;
  .header {
    width: 100%;
    h4 {
      min-height: 60px;
    }
    p {
      width: 100%;
      font-size: 14px;
      height: 40px;
    }
  }
  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 60px;
  }
`

export const BeerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  background-color: white;
  width: 200px;
  height: auto;
  margin: 70px 5px 10px 5px;
  padding: 80px 16px 16px 16px;
  position: relative;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
`

export const BeersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 800px;
  height: auto;
  margin: auto;
  justify-content: space-between;
  @media (min-width: 320px) and (max-width: 780px) {
    width: 100%;
    justify-content: center;
  }
`

export const StyledButton = styled('button', { primary: Boolean })`
  font-size: 1rem;
  width: ${props => (props.little ? '160px' : '100%')};
  padding: 0.5rem 0;
  border: 2px solid white;
  border-radius: 24px;
  background-image: linear-gradient(-90deg, #f6d364 0%, #fda085 100%);
  cursor: pointer;
  color: white;
  outline: none;
`

export const NavbarContainer = styled.nav`
  width: 100%;
  padding: 16px 16px 26px 16px;
  height: auto;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  margin-bottom: 56px;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    -webkit-mask: url(${Background}) repeat-x;
    background-image: linear-gradient(to bottom right, #fda085, #f6d365);
    opacity: 0.7;
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    right: 0;
    height: 100%;
    -webkit-mask: url(${SecondBackground}) repeat-x;
    background-image: linear-gradient(to bottom right, #fda085, #f6d365);
`

export const LinkStyledButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1rem;
  focus: none;
  color: white;
  font-weight: bold;
`

export const FlexRow = styled('div', { open: Boolean })`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20%;
  padding: 16px 0 32px 0;
  display: none;
  justify-content: space-around;
  @media (min-width: 320px) and (max-width: 900px) {
    width: 50%;
  }
  a {
    font-size: 1rem;
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
  ${props =>
    props.open &&
    `
      display : flex;
  `};
`

export const BurgerContainer = styled.div`
  width: 100%;
  height: auto;
`

export const Burger = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  span {
    height: 2px;
    width: 24px;
    background-color: white;
    position: absolute;
    transition: all 0.3s;
  }
`

export const BurgerLineRight = styled('span', { open: Boolean })`
  top: 0;
  ${props =>
    props.open &&
    `
        top : 9px;
        transform : rotate(45deg);
    `};
`

export const BurgerLineLeft = styled('span', { open: Boolean })`
  bottom: 0;
  ${props =>
    props.open &&
    `
        bottom : 9px;
        transform : rotate(-45deg);
    `};
`

export const BurgerLineMiddle = styled('span', { open: Boolean })`
  top: calc(50% - 1px);
  opacity: 1;
  ${props =>
    props.open &&
    `
        opacity : 0;
    `};
`

export const NavIcon = styled.img`
  width: 100%;
  height: 100%;
`

export const NavIconContainer = styled.div`
  box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.13);
  width: 40px;
  height: 40px;
  padding: 16px;
  background-color: #f6f6f6;
  border: 8px solid white;
  border-radius: 50%;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
`

export const HomeContainer = styled.div`
  background: url(${RegisterBgUp}) no-repeat top left,
    url(${RegisterBgDown}) no-repeat bottom right;
  @media (min-width: 320px) and (max-width: 900px) {
    background: url(${RegisterBgUpMobile}) no-repeat top left,
      url(${RegisterBgDownMobile}) no-repeat bottom right;
  }
`

export const PaddingContainer = styled.div`
  padding: 240px 0;
  @media (min-width: 320px) and (max-width: 900px) {
    padding: 80px 0;
  }
`

export const HomeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 40px 0 80px 0;
  color: white;
  h1 {
    font-size: 3rem;
  }
  a {
    color: white;
    width: 200px;
    margin-bottom: 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid white;
  }
  @media (min-width: 320px) and (max-width: 900px) {
    padding: 16px 0 32px 0;
  }
`

export const LoginContainer = styled.div`
  height: 100vh;
  background: url(${RegisterBgUp}) no-repeat top;
  background-size: cover;
  @media (min-width: 320px) and (max-width: 900px) {
    background: url(${RegisterBgUpMobile}) no-repeat top;
    background-size: cover;
  }
`

export const WhiteTitle = styled.h2`
  font-size: 2rem;
  color: white;
  padding-top: 20px;
  margin: 0;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  width: 800px;
  justify-content: space-between;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 780px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
      order: 2;
    }
    section {
      order: 1;
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
  position: relative;
  margin-bottom: 16px;
  &:after {
    content: ' ';
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    background-color: white;
    bottom: 0;
    left: 0;
    transition: all 0.5s;
  }
`

export const StyledInput = styled('input', { focus: Boolean })`
  position: relative;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 8px 0;
  font-size: 16px;
  color: white;
`

export const StyledLabel = styled('label', { focus: Boolean })`
  transform: ${props => (props.focus ? 'translateY(0px)' : 'translateY(24px)')};
  color: white;
  font-size: ${props => (props.focus ? 0.75 : 1.25)}rem;
  transition: all 0.5s;
  height: 1.5rem;
`

export const LoginButton = styled.button`
  width: 400px;
  margin: 16px 0;
  color: white;
  font-size: 1rem;
  padding: 8px 0;
  border-radius: 16px;
  background: transparent;
  outline: none;
  cursor: pointer;
  border: 1px solid white;
`

export const LinkButton = styled.button`
    font-size : 1rem;
    background : none;
    focus : none;
    outline : none;
    border : none;
    color : white;
    transition : text-decoration : 0.5s;
    &:hover{
        text-decoration :underline;
        transition : text-decoration : 0.5s;
    }
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 16px 32px;
  label {
    padding-bottom: 16px;
  }
  textarea {
    height: 80px;
  }
  .vue-rate-it-rating {
    padding: 16px 0;
    justify-content: space-evenly;
  }
`

export const RatedBeer = styled.div`
  width: 560px;
  @media (min-width: 320px) and (max-width: 780px) {
    width: calc(100% - 32px);
  }
`

export const RatedBeerContainer = styled.div`
  width: 100%;
  background: white;
  margin-bottom: 40px;
  border-radius: 4px;
  padding: 16px;
  .header {
    padding-bottom: 8px;
    border-bottom: 1px solid #e9eaea;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .body {
    position: relative;
    padding: 16px 0;
    display: flex;
    flex-direction: row;
  }
`

export const UserInfo = styled.div`
  text-align: left;
  margin-left: 16px;
  p {
    margin: 0;
    font-size: 1rem;
    color: #fda085;
    font-weight: bold;
    line-height: 18px;
  }
  span {
    font-size: 12px;
  }
`

export const BeerInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: -webkit-fill-available;
  margin: 0 32px;
  h5,
  p {
    width: 50%;
    margin: 0;
    text-align: left;
    font-size: 1rem;
  }
  p {
    font-size: 0.75rem;
    text-align: right;
  }
  div {
    font-size: 16px;
  }
`

export const AvatarBox = styled('div', { big: Boolean })`
  height: ${props => (props.big ? 160 : 48)}px;
  width: ${props => (props.big ? 160 : 48)}px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: ${props =>
    props.big ? '3px 2px 5px rgba(0, 0, 0, 0.13)' : 'none'};
  border: ${props => (props.big ? 4 : 0)}px solid white;
`

export const ProfileHeader = styled.header`
  width: 100%;
  background: white;
  padding: 72px 16px 16px 16px;
  margin: -104px 0 40px 0;
`

export const FollowBox = styled.div`
  background: pink;
`

export const FollowButton = styled('button', { isFollowed: Boolean })`
  background: ${props => (props.isFollowed ? '#f6d364' : 'white')};
  color: ${props => (props.isFollowed ? 'white' : '#f6d364')};
  height: auto;
  width: 120px;
  font-size: 14px;
  padding: 4px 8px;
  outline: none;
  border-radius: 16px;
  border: 2px solid ${props => (props.isFollowed ? 'white' : '#f6d364')};
  &:hover {
    cursor: pointer;
  }
`

export const HeaderUsername = styled.p`
  font-size: 24px;
  text-transform: capitalize;
  line-height: 8px;
  display: inline-block;
  padding-right: 8px;
`

export const HeaderContainer = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: row;
  height: auto;
  margin: auto;
  justify-content: flex-start;
  @media (min-width: 320px) and (max-width: 780px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`

export const TextHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  text-align: left;
  justify-content: center;
  width: calc(100% - 100px);
  & span {
    font-style: italic;
    color: grey;
  }
`

export const SidebarInfosBox = styled.div`
  width: 99px;
  height: 99px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 11px;
  padding: 32px 0;
`

export const SidebarInfos = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 200px;
  border: 1px solid #e9eaea;
  border-radius: 4px;
  height: min-content;
  div:nth-child(3),
  div:nth-child(4) {
    border-top: 1px solid #e9eaea;
  }
  div:nth-child(odd) {
    border-right: 1px solid #e9eaea;
  }
`

export const InfosBold = styled.p`
  font-size: 16px;
  margin: 0;
  font-weight: bold;
`

export const embiggen = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`

export const Snacks = styled.ul`
  position: fixed;
  top: 0;
  right: 12px;
  list-style: none;
  z-index: 5;
  display: flex;
  flex-direction: column;

  li {
    transition: all 0.5s;
  }

  .list-enter {
    opacity: 0;
    transform: translateY(-30px);
    color: yellow;
  }

  .list-exit,
  .list-active-exit,
  .list-done-exit {
    opacity: 0;
    transform: translateY(30px);
    color: blue;
  }

  .list-move {
    transition: transform 0.5s;
  }
`

export const Snack = styled.div`
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`

export const SnackContent = styled.div`
  height: inherit;
  width: 100%;
  max-width: 200px;
  height: 100%;
  padding-bottom: 16px;
  display: inline-block;

  > h4,
  p {
    padding: 4px 8px;
    margin: 0;
    text-align: left;
  }
`

export const SnackLoader = styled('div', { duration: Number })`
  width: inherit;
  position: absolute;
  height: 4px;
  bottom: 0;
  background: tomato;

  > div {
    width: 0%;
    height: 100%;
    background: white;
    animation: ${embiggen} linear;
    animation-duration: ${props => props.duration + 0.5}s;
  }
`

export const SnackDismiss = styled.button`
  width: auto;
  padding: 0 16px;
  border: none;
  background-color: white;
  outline: none;
  cursor: pointer;
  color: tomato;
  font-weight: bolder;
`

export const StyledModal = styled.div`
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 364px;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .modal-header h3 {
    color: #fda085;
  }

  .modal-body {
    width: 100%;
  }

  .modal-default-button {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    font-size: 0.85rem;
    cursor: pointer;
    color: white;
    outline: none;
  }

  .button-submit {
    background: dodgerblue;
    margin: 0 16px;
  }

  .button-close {
    background: red;
  }

  &.modal-enter {
    opacity: 0;
  }

  &.modal-exit {
    opacity: 0;
  }

  .modal-footer {
    width: 100%;
    padding: 16px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background: white;
    box-shadow: 0 -3px 6px 0 rgba(18, 19, 18, 0.09);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &.modal-enter .modal-container,
  &.modal-exit .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`
