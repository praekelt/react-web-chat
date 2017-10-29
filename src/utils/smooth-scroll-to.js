/*scroll-to allows one to add smooth scroll with a simplistic ease-in effect*/

let scrollInterruptFlag = false;
let animating = false;

function setScrollInterruptFlag(state) {
    scrollInterruptFlag = state;
}

function scrollHandler(e) {
    e.type === 'wheel' ? setScrollInterruptFlag(true) : null;
}

function getOffsets(el, container = window) {
    let rect = el.getBoundingClientRect(),
        scrollLeft =
            container.pageXOffset || container.scrollLeft || document.documentElement.scrollLeft,
        scrollTop =
            container.pageYOffset || container.scrollTop || document.documentElement.scrollTop;
    let result = { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    return result;
}

window.addEventListener('wheel', scrollHandler);
window.addEventListener('scroll', scrollHandler);

/*
 smoothScrollTo(to, duration)
 to: a Dom Node
 duration: 1 = instant, 20 = slow
 data: object to return when the animation ends via promises resolve function.
 */
function smoothScrollTo({ to, container = window, duration = 20, data }) {
    return new Promise(resolve => {
        if (!animating) {
            animating = true;
            setScrollInterruptFlag(false);
            let toRect = getOffsets(to, container);

            let end = toRect.top;
            let distance = toRect.top - container.scrollTop;

            let sign = Math.sign(distance);
            let offset = Math.abs(distance);
            let currPos = container.scrollTop;

            function step() {
                if (!scrollInterruptFlag) {
                    if (Math.abs(offset) > 1 && animating) {
                        let change = offset / duration;
                        offset = offset - change;
                        currPos = currPos + sign * change;
                        container.scrollTop = currPos;
                        requestAnimationFrame(step);
                    } else {
                        container.scrollTop = end;
                        animating = false;
                        resolve(data);
                    }
                } else {
                    setScrollInterruptFlag(false);
                    animating = false;
                    resolve(data);
                }
            }

            requestAnimationFrame(step);
        } else {
            animating = false;
            smoothScrollTo({ to, container, duration, data });
        }
    });
}

export default smoothScrollTo;
