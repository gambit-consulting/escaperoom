sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/library'
], function (Controller, fioriLibrary) {
    "use strict";

    return Controller.extend("de.gambit.sap.escaperoom.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("list").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);
		},

        onProductPress: function (oEvent) {
			var sProductId = oEvent.getSource().getBindingContext().getObject("ProductID");

			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, orderId: this._orderId, productId: sProductId});
		},

		_onProductMatched: function (oEvent) {
			this._orderId = oEvent.getParameter("arguments").orderId || this._orderId || "0";

            const sKey = this.getView().getModel().createKey("/OrderSet", { OrderID: this._orderId });
			this.getView().bindElement({
				path: sKey,
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

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		onExit: function () {
			this.oRouter.getRoute("list").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		}
    });
});