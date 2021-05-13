import React from "react";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { DialogTitle } from "@material-ui/core";
import { ACTIONS_ID, GENERIC_DRAGGABLE_ID, TITLE_ID } from "../constants/Ids";

const titleId = TITLE_ID;
const actionsId = ACTIONS_ID;
const genericDraggableId = GENERIC_DRAGGABLE_ID;
const draggableStyle = { cursor: "move" };

/**
 * IMPORTANT NOTE: this will only work as the `PaperComponent` prop of a
 * `Dialog` where said dialog has at least one child with id `titleId`,
 * `actionsId`, or `genericId`, e.g. `DraggableTitle` below. Note that it isn't
 * currently possible to pass props into custom child components per
 * https://github.com/mui-org/material-ui/issues/23043, hence the hard-coding
 */
function DraggablePaper(props) {
  // This is to quiet strict mode warnings about findDOMNode usage. See
  // https://stackoverflow.com/a/63603903/12162258 for details
  const nodeRef = React.useRef(null);

  return (
    <Draggable
      handle={`#${titleId},#${actionsId},#${genericDraggableId}`}
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef}
    >
      <Paper ref={nodeRef} {...props} />
    </Draggable>
  );
}

/**
 * IMPORTANT NOTE: as this component has a hard-coded id, it should not be used
 * more than once in any particular DOM. As we don't generally display more than
 * one `Dialog` at a time, this isn't likely to be an issue
 */
function DraggableDialogTitle(props) {
  return (
    <DialogTitle {...props} style={draggableStyle} id={titleId}>
      {props.children}
    </DialogTitle>
  );
}

/**
 * IMPORTANT NOTE: as this component has a hard-coded id, it should not be used
 * more than once in any particular DOM. As we don't generally display more than
 * one `Dialog` at a time, this isn't likely to be an issue.
 *
 * Additionally, note that using this component with clickable children, e.g.
 * buttons, breaks said children on touch screens
 */
function DraggableDialogActions(props) {
  return (
    <DialogTitle {...props} style={draggableStyle} id={actionsId}>
      {props.children}
    </DialogTitle>
  );
}

export {
  DraggablePaper,
  DraggableDialogTitle,
  DraggableDialogActions,
  genericDraggableId,
  draggableStyle,
};
