import * as Utils from "./utils";

export default class Image {
    /**
     * Represents the image
     * @constructor
     * @param {Node} img - image
     * @param {number} cardindex - index of card
     */
    constructor(img, cardindex) {
        this._img = img;
        this._cardindex = cardindex;
        this._processImgsWithoutAttr();
    }

    /**
     * Get image without width and height attributes
     * Trigger custom event after load
     */
    _processImgsWithoutAttr() {

        if(!this._img.getAttribute("width") && !this._img.getAttribute("height")) {
            const fireImgLoad = () => {
                Utils.ModuleEventManager.dispatch('imgload', {data: this._cardindex});
            }
            this._img.addEventListener('load', fireImgLoad);
        }
    }
}