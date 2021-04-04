import Image from './image';

export default class Card {
    /**
     * Represents the grid element
     * @constructor
     * @param {Node} el - card
     * @param {number} index - index of card
     * @param {boolean} animate - card animation enabled / disabled
     */
    constructor(el, index, animate) {
        this._domelement = el;
        this._offset = 0;
        this._cardindex = index;
        this._imgList = this._domelement.querySelectorAll('img');
        this._init(animate);
    }

    /**
     * Add class to card
     * If animation is set true, wrap card content in div.osb_griditem-inner
     * @param {boolean} animate - card animation enabled / disabled
     */
    _init(animate) {
        this._domelement.classList.add('osb_griditem');
        if(animate) {
            this._domelement.innerHTML = `<div class='osb_griditem-inner'>${this._domelement.innerHTML}</div>`;
            this._imgList.forEach(img => new Image(img, this._cardindex));
        }
    }

    /**
     * Set element translateY
     * @param {number} offset
     */
    translate(offset) {
        this._domelement.style.transform = `translateY(-${offset}px)`;
        this._offset = offset;
    }

    /**
     * Initial card animation
     */
    animate() {
        this._domelement.classList.add('osb_animation-complete');
    }

    /**
     * Reset classList
     */
    reset() {
        this._domelement.classList.remove('osb_animation-complete');
    }

    get height() {
        return this._domelement.offsetHeight;
    }

    get width() {
        return this._domelement.offsetWidth;
    }

    get offset() {
        return this._offset;
    }
}