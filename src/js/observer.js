import {ModuleEventManager} from "./utils";

export class ObserveDOM {
    constructor(el) {
        this._domelement = el;
        this._observe();
    }
    _observe(){

        const processChildMutations = (mutations) => {
            for (let mutation of mutations) {
                let index = -1;
                if (mutation.type === 'childList') {
                    // card added
                    if(mutation.addedNodes.length
                        && mutation.addedNodes[0].nodeType === 1
                        && mutation.addedNodes[0].classList.contains('osb_griditem')){
                        const addedCard = mutation.addedNodes[0];
                        index = Array.from(mutation.target.children).indexOf(addedCard);
                        ModuleEventManager.dispatch('addcard', {data: index});
                    }
                    // card removed
                    else if(mutation.removedNodes.length
                        && mutation.removedNodes[0].nodeType === 1
                        && mutation.removedNodes[0].classList.contains('osb_griditem')){

                        const getIndex = () => {
                            if(mutation.previousSibling !== null){
                                return mutation.previousSibling.nextElementSibling !== null ? Array.from(mutation.target.children).indexOf(mutation.previousSibling.nextElementSibling) : mutation.target.children.length;
                            }
                            else{
                                return 0;
                            }
                        }
                        index = getIndex();
                        ModuleEventManager.dispatch('removecard', {data: index});
                    }
                }
            }
        }
        const mutationObserver = new MutationObserver(processChildMutations);
        mutationObserver.observe(this._domelement, {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true
        });
    }
}
export class ObserveSizing {
    constructor(el, _this) {
        this._domelement = el;
        this._card = _this;
        this._observe();
    }
    _observe(){
        const processHeightChanges = (entries) => {
            for (let entry of entries) {
                if(entry.contentBoxSize) {
                    ModuleEventManager.dispatch('mutationevent', {data: this._card.cardindex});
                }
            }
        }
        const resizeObserver = new ResizeObserver(processHeightChanges);
        resizeObserver.observe(this._domelement);
    }
}