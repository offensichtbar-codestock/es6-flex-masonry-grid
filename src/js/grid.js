import * as Utils from "./utils";
import Card from "./card";

const DEFAULTCONFIG = {
    animation: true,
    animationType: 'fade',
    animationDelay: 200
}

export default class OSB_MasonryGrid {
    /**
     * Represents the grid
     * @constructor
     * @param {object} config - animation config
     * @param {node} el - HTMLElement
     */
    constructor(el, config) {
        /* Error if element not exists */
        if (!el) {
            throw new ReferenceError("The specified HTML selector for the grid is not valid. Please make sure that the referenced HTML object exists. For more information, visit the documentation at https://github.com/offensichtbar-codestock/es6-flex-masonry-grid.");
        }
        this._config = this.setConfig(config);
        this._domelement = el;
        if (this._config.animation) this._domelement.classList.add(`obs_grid-animation-${this._config.animationType.toLowerCase()}`);
        this._initCards();
        this._animateCards();
        this._initGrid();
        this._addEventListener();
    }
    /**
     * Merges default config and custom config
     * @param {object} config - custom config
     * @return {object} _config
     */
    setConfig(config) {
        this._config = config || DEFAULTCONFIG;
        return Object.assign(DEFAULTCONFIG, this._config);
    }

    /**
     * Initializes the grid elements
     * Creates instances of grid cards
     * and pushes them to this._cards array
     */
    _initCards() {
        this._cards = [];
        Array.from(this._domelement.children).forEach((child, index) => {
            const card = new Card(child, index, this._config.animation);
            this._cards.push(card);
        });
    }
    /**
     * Animates the grid elements.
     */
    _animateCards() {
        let speed = this._config.animationDelay;
        if(!this._config.animation) speed = 0;
        Array.from(this._cards).forEach((card, index) => {
            setTimeout(()=> { card.animate() },index * speed );
        });
    }

    /**
     * Initializes the grid
     * Gets amount of cols
     * Gets heights of rows
     * Sets card translation for masonry layout
     * Sets container height
     */
    _initGrid() {
        /* Calculates amount of cols */
        this._cols = Math.round(this._domelement.offsetWidth / this._cards[0].width);
        /* Calculates row heights */
        this._calcRowHeights();
        /* Set card translation for masonry layout */
        this._translateCard();
        /* Set container height */
        this._setContainerHeight();
    }

    /**
     * Accumulates the offset values per column
     * @param {number} index - index of current card
     * @return {number} offset - card translateY
     */
    _getPrevOffset(index){
        let prevElIndex = index - this._cols;
        let offset = 0;
        while(prevElIndex >= 0){
            let currentRowHeight = this._rowHeights[Math.floor(prevElIndex / this._cols)];
            let currentOffset = currentRowHeight - this._cards[prevElIndex].height;
            offset += currentOffset;
            prevElIndex = prevElIndex - this._cols;
        }
        return offset;
    }

    /**
     * Translates consecutive cards in a column
     * after change of height of specific card
     * @param {string} event - loadevent
     */
    _translateSuccessors(event) {
        let index = event.data;
        let offset = this._cards[index].offset;
        let successor = index + this._cols;
        for(successor; successor < this._cards.length; successor += this._cols){
            offset += this._getRowHeight(successor - this._cols) - this._cards[successor - this._cols].height;
            this._cards[successor].translate(offset);
        }
        this._setContainerHeight();
    }

    /**
     * Gets row height
     * by comparing heights of cards per row
     * Assigns the largest element height value per row to this._rowHeights array item
     */
    _calcRowHeights() {
        this._rowHeights = [];
        const rows = Math.ceil(this._cards.length / this._cols );
        for(let row = 0; row < rows; row++) {
            this._rowHeights.push(0);
            const cardsPerRow = this._cards.slice(row * this._cols, row * this._cols + this._cols);
            this._rowHeights[row] = Math.max(...cardsPerRow.map(card=>card.height));
        }
    }

    /**
     * Gets row height of current card
     * @param {number} index - index of card
     * @return {number} number - row height
     */
    _getRowHeight(index){
        const firstCardIndex = index - ( index % this._cols );
        const cards = this._cards.slice(firstCardIndex, firstCardIndex + this._cols).map(card => card.height);
        return Math.max(...cards);
    }

    /**
     * Sets transform: translateY style to each card
     */
    _translateCard() {
        Array.from(this._cards).forEach((card, index) => {
            card.translate(this._getPrevOffset(index));
        });
    }

    /**
     * Sets total height for container
     */
    _setContainerHeight() {
        const _containerHeight = [];
        for(let col = 0; col < this._cols; col++) {
            _containerHeight.push([0]);
            let i = 0;
            while(col + this._cols * i < this._cards.length){
                let currVal = _containerHeight[col % this._cols];
                let newVal = this._cards[col + i*this._cols].height;
                _containerHeight[col % this._cols] = parseInt(currVal) + newVal;
                i++;
            }
        }
        this._domelement.style.height = `${Math.max(..._containerHeight)}px`;
    }

    /**
     * Triggers grid animation
     * @param{object} animationType - animation type
     */
    triggerAnimation(animationType){
        const classes = Array.from(this._domelement.classList);
        const targetClass = classes.filter(cls => cls.includes('obs_grid-animation-'));
        this._domelement.classList.remove(targetClass);
        this._cards.forEach(card => card.reset());
        this._config.animationType = animationType.toLowerCase();
        this._domelement.classList.add(`obs_grid-animation-${this._config.animationType}`);
        setTimeout( () => { this._animateCards()}, this._config.animationDelay );
    }

    /**
     * Adds event listener for resize
     * Recalculates card specs on resize
     * Recalculates translation values for cards on resize
     * Reinits grid when image without width and height attributes is loaded
     * @callback{function}
     */
    _addEventListener() {

        const initgrid = Utils.debounce(() => {
            this._initGrid();
        }, 200);
        window.addEventListener('resize', initgrid);

        Utils.ModuleEventManager.on('imgload', this._translateSuccessors );
    }
}