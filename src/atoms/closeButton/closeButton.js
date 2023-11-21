import React from "react";
import { Button } from "semantic-ui-react";
import "./closeButton.css";

function CloseButton({ onClick }) {
  return (
    <div className="close-button">
      <Button data-testid="close" secondary onClick={onClick}>
        X
      </Button>
    </div>
  );
}

export default CloseButton;
