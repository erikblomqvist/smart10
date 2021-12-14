import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 32px;

    width: 100vw;
    height: 100vh;
`

export const CorrectAnswer = styled.div`
    position: fixed;
    z-index: 1;

    width: 100vw;
    height: calc(100vh - 32px);
    background: transparent;

    perspective: 1000px;

    &.hide {
        pointer-events: none;
    }
`

export const CorrectAnswerInner = styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    transition: transform 0.6s;
    transform-style: preserve-3d;

    ${CorrectAnswer}.show & {
        transform: rotateX(180deg);
    }
`

export const CorrectAnswerContent = styled.div`
    position: absolute;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    background: white;

    backface-visibility: hidden;
    transform: rotateX(180deg);

    h1 span.white,
    h1 span.yellow {
        text-shadow:
            0px -1px black,
            0 1px black,
            1px 0 black,
            -1px 0 black;
    }

    h1 span:not(:last-of-type) {
        &::after {
            content: ' / ';

            color: black;
        }
    }
`

export const CorrectAnswerButtons = styled.div`
    display: flex;
    column-gap: 48px;
`

const answerButton = css`
    outline: none;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid black;
    background: white;

    svg {
        stroke-width: 2;
    }
`

export const CorrectButton = styled.button`
    ${answerButton}

    color: green;
`

export const WrongButton = styled.button`
    ${answerButton}

    color: red;
`

export const Board = styled.div`
    display: grid;
    place-items: center;

    width: 100%;
    height: 100%;

    background: linear-gradient(30deg, #ffcb26 50%, #ffce2a 75%, #ffff6c 95%);
`

export const Container = styled.div`
    position: relative;

    width: calc(100vw - 400px);
    height: calc(100vh - 400px);
    min-width: 75vw;
    min-height: 50vh;
    max-height: 450px;

    border-radius: 48px;
    background: #fbf0cf;
    box-shadow:
        0 0 5px 5px rgba(219, 153, 28, 0.9),
        -1px 0 2px 6px rgba(255, 255, 168, 0.8),
        inset 8px 0 1px rgba(211, 147, 28, 0.9),
        inset 0 10px 1px rgba(128, 89, 17, 0.9),
        inset -8px 0 1px rgba(97, 68, 12, 0.9),
        inset 0 30px 45px 30px rgba(194, 172, 125, 0.5),
        inset 1px 1px 2px rgba(255, 255, 255, 0.95);
`

export const Question = styled.h1`
    position: absolute;
    top: 50%;
    left: 50%;

    margin: 0;
    width: 58%;
    transform: translate(-50%, -50%);

    text-align: center;
    font-size: 28px;
`

export const Answers = styled.div`
    display: grid;
    /* grid-template-rows: 0.5fr 1fr 1fr 0.5fr;
    grid-template-columns: 0.5fr 1fr 1fr 1fr 0.5fr; */
    grid-template-rows: repeat(4, minmax(0, max-content));
    grid-template-columns: 110px repeat(3, minmax(100px, max-content)) 110px;
    align-content: space-between;
    justify-content: space-between;

    height: 100%;
`

export const Answer = styled.div`
    --plupp-size: 56px;

    position: relative;
    display: flex;

    padding: 16px;

    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3) {
        justify-content: center;
    }

    &:nth-of-type(4),
    &:nth-of-type(5) {
        align-items: center;
        justify-content: flex-end;

        padding-left: 0;
    }

    &:nth-of-type(6),
    &:nth-of-type(7),
    &:nth-of-type(8) {
        align-items: flex-end;
        justify-content: center;
    }

    &:nth-of-type(9),
    &:nth-of-type(10) {
        align-items: center;
        justify-content: flex-start;

        padding-right: 0;
    }

    &:nth-of-type(1) {
        grid-column: 2 / 3;
    }

    &:nth-of-type(2) {
        grid-column: 3 / 4;
    }

    &:nth-of-type(3) {
        grid-column: 4 / 5;
    }

    &:nth-of-type(4) {
        grid-column: 5 / 6;
        grid-row: 2 / 3;
    }

    &:nth-of-type(5) {
        grid-column: 5 / 6;
        grid-row: 3 / 4;
    }

    &:nth-of-type(6) {
        grid-row: 4 / 5;
        grid-column: 4 / 5;
    }

    &:nth-of-type(7) {
        grid-row: 4 / 5;
        grid-column: 3 / 4;
    }

    &:nth-of-type(8) {
        grid-row: 4 / 5;
        grid-column: 2 / 3;
    }

    &:nth-of-type(9) {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
    }

    &:nth-of-type(10) {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
    }

    &:nth-of-type(1) {
        grid-column: 2 / 3;
    }

    &:nth-of-type(1) {
        grid-column: 2 / 3;
    }
`
export const Alternative = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;

    ${Answer}:nth-of-type(4) &,
    ${Answer}:nth-of-type(5) & {
        text-align: end;
    }

    ${Answer}:nth-of-type(9) &,
    ${Answer}:nth-of-type(10) & {
        text-align: start;
    }

    img {
        width: auto;
        height: 56px;
        max-height: 100%;
    }
`

export const Plupp = styled.button`
    cursor: pointer;

    position: absolute;

    width: 48px;
    height: 48px;
    padding: 0;

    border-radius: 100%;
    background-image: radial-gradient(55% 85% at 60% 100%, #1D1D1D 20%, #595959 100%);
    box-shadow:
        -4px 4px 4px rgba(210, 147, 27, 0.67),
        inset -8px -8px 4px rgba(7, 17, 32, 0.1),
        inset 2px 2px 2px rgba(255, 255, 255, 0.8);
    background-clip: padding-box;

    &:not(.correct):not(.wrong) {
        svg {
            display: none;
        }
    }

    &.correct,
    &.wrong {
        background: white;

        svg {
            stroke-width: 2;
        }
    }

    &.correct {
        color: green;
    }

    &.wrong {
        color: red;
    }

    ${Answer}:nth-of-type(1) &,
    ${Answer}:nth-of-type(2) &,
    ${Answer}:nth-of-type(3) & {
        top: -64px;
        left: 50%;

        transform: translateX(-50%);
    }

    ${Answer}:nth-of-type(4) &,
    ${Answer}:nth-of-type(5) & {
        top: 50%;
        right: -64px;

        transform: translateY(-50%);
    }

    ${Answer}:nth-of-type(6) &,
    ${Answer}:nth-of-type(7) &,
    ${Answer}:nth-of-type(8) & {
        bottom: -64px;
        left: 50%;

        transform: translateX(-50%);
    }

    ${Answer}:nth-of-type(9) &,
    ${Answer}:nth-of-type(10) & {
        top: 50%;
        left: -64px;

        transform: translateY(-50%);
    }
`