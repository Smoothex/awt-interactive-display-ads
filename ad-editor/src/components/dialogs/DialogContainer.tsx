import React from 'react';
import AdTemplateCreateDialog from "./AdTemplateCreateDialog";
import AdTemplateRemoveDialog from "./AdTemplateRemoveDialog";
import AdInstanceCreateDialog from "./AdInstanceCreateDialog";
import AdInstanceRemoveDialog from "./AdInstanceRemoveDialog";

const DialogContainer = () => {
    return (
        <>
            <AdTemplateCreateDialog />
            <AdTemplateRemoveDialog />
            <AdInstanceCreateDialog />
            <AdInstanceRemoveDialog />
        </>
    );
};

export default DialogContainer;