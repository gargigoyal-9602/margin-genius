import * as React from "react";
import { TabContent } from './Deals.style';
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import {
     MainButton,
     OutlineButton,
     InputText,
     RedOutlineButton,
     InputTextArea,
     ErrorMsg,
} from "../../components/formControls.style";
export const Comments = () => {
     return (
          <>
               <TabContent className="details">
                    <div className="details-tab">
                         <div className="comment-box">
                              <Image
                                   src="/icons/no-chat.svg"
                                   width="115"
                                   height="115" alt="chat" />

                              <span>You have no history of comments yet. Leave a comment for salesman or look for comments here later.</span>
                              <div className="buttonwrap">
                                   <div>
                                        <InputLabel htmlFor="description">
                                        Leave a comment for an approver
                                        </InputLabel>
                                        <InputTextArea
                                             minRows={4}
                                             id="description"
                                             name="description"
                                             placeholder="You can add comments on current deal to your approver"
                                        />
                                   </div>
                                   <MainButton
                                        fixwidth="auto"
                                        marginbottom="0"
                                        variant="contained"
                                        style={{ width: "110px" }}
                                        type="submit"
                                   >
                                        send
                                   </MainButton>
                              </div>
                         </div>
                    </div>
                    <div className="buttonWrap">
                         <OutlineButton
                              variant="text"
                              fixwidth="auto"
                              marginbottom="0"
                              //className={layout.mr_10}
                              style={{ border: "0", color: "#0A2828" }}>
                              Cancel
                         </OutlineButton>
                         <MainButton
                              fixwidth="auto"
                              marginbottom="0"
                              variant="contained"
                              type="submit"  >
                              Change Status
                         </MainButton>
                    </div>
               </TabContent>
          </>
     )
}