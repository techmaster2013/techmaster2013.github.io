'use strict';

const LifePerTick = 1000 / 60;
const MaxFlakes = Math.min(10, screen.width / 1280 * 10);
const Flakes = [];

const Period = [
    n => 5 * (Math.sin(n)),
    n => 8 * (Math.cos(n)),
    n => 5 * (Math.sin(n) * Math.cos(2 * n)),
    n => 2 * (Math.sin(0.25 * n) - Math.cos(0.75 * n) + 1),
    n => 5 * (Math.sin(0.75 * n) + Math.cos(0.25 * n) - 1)
];

const Fun = ['⛄', '🎁', '🦌', '☃', '🍪'];

const CssString = `.snowfall-container {
    display: block;
    height: 100vh;
    left: 0;
    margin: 0;
    padding: 0;
    -webkit-perspective-origin: top center;
            perspective-origin: top center;
    -webkit-perspective: 150px;
            perspective: 150px;
    pointer-events: none;
    position: fixed;
    top: 0;
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
    width: 100%;
    z-index: 99999; }

  .snowflake {
    pointer-events: none;
    color: #ddf;
    display: block;
    font-size: 24px;
    left: -12px;
    line-height: 24px;
    position: absolute;
    top: -12px;
    -webkit-transform-origin: center;
            transform-origin: center; }`;

function Ready(fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function ResetFlake(flake) {
    let x = flake.dataset.origX = (Math.random() * 100);
    let y = flake.dataset.origY = 0;
    let z = flake.dataset.origZ = (Math.random() < 0.1) ? (Math.ceil(Math.random() * 100) + 25) : 0;
    let life = flake.dataset.life = (Math.ceil(Math.random() * 4000) + 6000);
    flake.dataset.origLife = life;
    flake.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px)`;
    flake.style.opacity = 1.0;
    flake.dataset.periodFunction = Math.floor(Math.random() * Period.length);
    if (Math.random() < 0.001) {
        flake.innerText = Fun[Math.floor(Math.random() * Fun.length)];
    }
}

function UpdatePositions() {
    Flakes.forEach((flake) => {
        let origLife = parseFloat(flake.dataset.origLife)
        let curLife = parseFloat(flake.dataset.life);
        let dt = (origLife - curLife) / origLife;
        if (dt <= 1.0) {
            let p = Period[parseInt(flake.dataset.periodFunction)];
            let x = p(dt * 2 * Math.PI) + parseFloat(flake.dataset.origX);
            let y = 100 * dt;
            let z = parseFloat(flake.dataset.origZ);
            flake.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px)`;
            if (dt >= 0.5) {
                flake.style.opacity = (1.0 - ((dt - 0.5) * 2));
            }
            curLife -= LifePerTick;
            flake.dataset.life = curLife;
        }
        else {
            ResetFlake(flake);
        }
    });
    window.requestAnimationFrame(UpdatePositions);
}

function AppendSnow() {
    let styles = document.createElement('style');
    styles.innerText = CssString;
    document.querySelector('head').appendChild(styles);
    let field = document.createElement('div');
    field.classList.add('snowfall-container');
    field.setAttribute('aria-hidden', 'true');
    field.setAttribute('role', 'presentation');
    document.body.appendChild(field);
    let i = 0;
    const addFlake = () => {
        let flake = document.createElement('span');
        flake.classList.add('snowflake');
        flake.setAttribute('aria-hidden', 'true');
        flake.setAttribute('role', 'presentation');
        flake.innerText = '❄';
        ResetFlake(flake);
        Flakes.push(flake);
        field.appendChild(flake);
        if (i++ <= MaxFlakes) {
            setTimeout(addFlake, Math.ceil(Math.random() * 300) + 100);
        }
    };
    addFlake();
    UpdatePositions();
}

Ready(AppendSnow);
