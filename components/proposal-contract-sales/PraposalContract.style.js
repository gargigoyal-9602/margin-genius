import styled from "styled-components";

export const AccordianWrap = styled.div`
.MuiAccordionDetails-root {
    .tbl-row {
        padding: 12px 35px;
        p{
            margin-left: 17px;
        }
    }
}
.MuiAccordionSummary-root {
    outline: 1px solid rgba(239,241,241,1);
    border: 1px solid rgba(239,241,241,1);
    margin-right: 10px;
    margin-bottom: 1px;
    border-radius: 6px;
    min-height: 40px !important;
    padding: 0 0 0 10px;
    flex-direction: row-reverse;
    
    .MuiAccordionSummary-content {
        margin: 0;
        .tbl-row {
        border: 0;
        outline: 0;
        &:hover {
            border: 0;
        }
    }
    }
}
.MuiPaper-root {
    margin-bottom:0;
}

`
