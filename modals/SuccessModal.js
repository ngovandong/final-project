import * as React from "react";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_SUCCESS_MODAL } from "../redux/slices/modalSlice";

export default function SuccessModal() {
  const dispatch = useDispatch();

  const hideDialog = () => {
    dispatch(CLOSE_SUCCESS_MODAL());
  };

  const text = useSelector((state) => state.modal.successText);

  const visible = useSelector((state) => state.modal.showSuccess);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Success</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{text}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
