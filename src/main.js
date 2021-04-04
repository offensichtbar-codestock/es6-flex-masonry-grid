import OSB_MasonryGrid from './js/grid';

/**
 * Represents the grid element
 * @constructor
 * @param {boolean} : animation (default: true)
 * @param {string} : animationType (default: fade)
 * fade
 * translateBottom
 * translateTop
 * scale
 * scaleUp
 * scaleDown
 * slide
 * slideIn
 * flip
 * @param {number} : animationDelay in ms (default: 200)

const OSB_GRID = document.querySelector('#demo_masonry-grid');

document.addEventListener("DOMContentLoaded", function(event) {
    const grid = new OSB_MasonryGrid(OSB_GRID, {
        animation: true,
        animationType: 'slideIn',
        animationDelay: 300
    });

    const animationDemo = () => {
        const inputFields = document.getElementsByTagName('input');
        const getCheckedEl = () => Array.from(inputFields).filter(input => input.checked);
        const triggerAnimation = () => {
            const checkedEl = getCheckedEl();
            const checkedVal = checkedEl[0].id
            grid.triggerAnimation(checkedVal);
        }
        document.addEventListener('input', triggerAnimation);

    }
    animationDemo();
});
 */

window.OSB_MasonryGrid = OSB_MasonryGrid;