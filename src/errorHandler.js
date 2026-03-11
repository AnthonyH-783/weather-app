export class ErrorHandler{

    constructor(error_dom){
        this.error_dom = error_dom;
    }

    displayError(){
        this.error_dom.classList.add("active");
    }
    hideError(){
        this.error_dom.classList.remove("active");
    }
}