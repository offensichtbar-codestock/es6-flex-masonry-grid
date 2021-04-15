import * as Utils from "./utils";
import Card from "./card";
import {ObserveDOM} from "./observer";

const DEFAULTCONFIG = {
    animation: true,
    animationType: 'fade',
    animationDelay: 200,
    observeDOM: false,
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
        this._observeGrid();
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
        const cardWidth = this._cards[0] !== undefined ? this._cards[0].width : this._domelement.offsetWidth;
        this._cols = Math.round(this._domelement.offsetWidth / cardWidth);
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
     * Observes addition and removal of cards
     */
    _observeGrid(){
        new ObserveDOM(this._domelement);
    }

    /**
     * Creates card instance
     * Adds class to new card
     * Adds card instance to array
     * Reinits grid
     * @param{event} event - addcard
     */
    _addCard(event){
        const newCard = this._domelement.children[event.data];
        const card = new Card(newCard, this._cards.length, this._config.animation);
        this._cards.splice(event.data, 0, card);
        this._cards.forEach((card, index) => card.cardindex = index);
        setTimeout(()=> { card.animate() }, 100 );
        this._initGrid();
    }

    /**
     * Removes card instance from array
     * Resets card indexes
     * Reinits grid
     * @param{event} event - removecard
     */
    _removeCard(event){
        const removedElIndex = event.data;
        this._cards.splice(removedElIndex, 1);
        this._cards.forEach((card, index) => card.cardindex = index);
        this._initGrid();
    }

    /**
     * Adds event listener for resize
     * Recalculates card specs on resize
     * Recalculates translation values for cards on resize
     * Reinits grid when card is added or removed
     * Reinits grid when card height changes
     * @callback{function}
     */
    _addEventListener() {

        const initgrid = Utils.debounce(() => {
            this._initGrid();
        }, 200);
        window.addEventListener('resize', initgrid);

        Utils.ModuleEventManager.on('addcard', this._addCard.bind(this) );
        Utils.ModuleEventManager.on('removecard', this._removeCard.bind(this) );
        Utils.ModuleEventManager.on('mutationevent', this._initGrid.bind(this) );
    }
}