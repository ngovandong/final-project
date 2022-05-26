import * as React from "react";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_ERROR_MODAL,
} from "../redux/slices/modalSlice";

export default function ErrorModal() {
  const dispatch = useDispatch();

  const hideDialog = () => {
    dispatch(CLOSE_ERROR_MODAL());
  };

  const errorText = useSelector((state) => state.modal.errorText);

  const visible = useSelector((state) => state.modal.showError);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{errorText}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
