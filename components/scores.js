import styled from 'styled-components'
import { SubmitButton } from './game'

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 24px;

    background: #333;

    color: white;
`

export const Player = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 8px;

    font-size: 0.875em;
    line-height: 1.5;
    color: white;

    &:after {
        content: '';

        position: absolute;
        top: -4px;

        border-radius: 24px 24px 0 0;
        width: 100%;
        height: 0;
        background-color: #F45D78;

        transition: height 0.2s ease-in-out;
    }

    svg {
        margin: 0;
        stroke-width: 3;
    }

    p {
        margin: 0;

        font-size: 14px;
        font-weight: 700;
        line-height: 2;
        color: inherit;
    }

    &.active {
        &:after {
            height: 4px;
        }
    }

    &.disabled:not(.out) {
        color: gray;
    }

    &.out {
        box-shadow: 0 0 0 2px red;

        color: red;
    }
`

export const PassButton = styled(SubmitButton)`
    position: fixed;
    top: 24px;
    left: 24px;
    right: auto;
    bottom: auto;

    height: auto;
`