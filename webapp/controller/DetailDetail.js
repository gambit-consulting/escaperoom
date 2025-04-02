sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("de.gambit.sap.escaperoom.controller.DetailDetail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onPatternMatch, this);
		},

        formatPictureSrc: function (sImage) {
            // this cannot be all of the logic right?
            return sImage;
        },

		_onPatternMatch: function (oEvent) {
			this._orderId = oEvent.getParameter("arguments").orderId || this._orderId || "0";
			this._productId = oEvent.getParameter("arguments").productId || this._productId || "0";

            const sKey = this.getView().getModel().createKey("/Products", { ProductID: this._productId });
			this.getView().bindElement({
				path: sKey,
                parameters: {
                    expand: "Category"
                },
                events: {
                    dataRequested: () => {
                        this.getView().setBusy(true);
                    },
                    dataReceived: () => {
                        this.getView().setBusy(false);
                    }
                }
			});
		},

		onExit: function () {
			this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});