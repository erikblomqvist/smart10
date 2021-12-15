import styled from 'styled-components'

export const Background = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 100vw;
    height: 100vh;
    padding-left: 20vw;

    background: linear-gradient(289.69deg, #FFB82E 28.45%, #FFCE70 87.82%);
`

export const Logo = styled.div`
    position: absolute;
    top: 32px;
    right: 32px;

    img {
        max-width: 208px !important;
    }

`

export const Select = styled.select`
    appearance: none;

    margin: 0;
    outline: none;
    border-radius: 4px;
    border: 2px solid black;
    padding: 0.5em 1em;
    background: transparent;

    font-family: inherit;
    font-size: 1em;
`

export const Players = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    margin-top: 32px;

    svg {
        stroke-width: 3;
    }
`

export const Player = styled.div`
    box-sizing: content-box;

    display: flex;

    border: 4px solid #FFB443;
    border-radius: 6px;
    width: 40vw;
    height: 40px;

    div {
        display: grid;
        place-items: center;
        flex: 1 0 40px;

        border-radius: 6px 0 0 6px;
        width: 40px;
        height: 40px;
        background-color: #202020;

        color: white;
    }

    input {
        border: none;
        border-radius: 0 6px 6px 0;
        outline: none;
        width: 100%;
        padding-inline-start: 8px;
        background: white;

        font-family: inherit;
        font-size: 16px;
    }
`

export const SubmitButton = styled.button`
    position: absolute;
    right: 24px;
    bottom: 24px;

    border: none;
    border-radius: 5px;
    padding: 1em;
    background: black;
    box-shadow:
        0px 6px 11px rgba(0, 0, 0, 0.24),
        0px 2px 2px rgba(0, 0, 0, 0.2);

    font-family: inherit;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    text-transform: uppercase;
    color: white;
`